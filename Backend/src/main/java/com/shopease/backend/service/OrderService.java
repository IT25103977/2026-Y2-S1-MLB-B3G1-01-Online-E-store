package com.shopease.backend.service;

import com.shopease.backend.model.CustomerOrder;
import com.shopease.backend.model.OrderItem;
import com.shopease.backend.model.Product;
import com.shopease.backend.model.SystemNotification;
import com.shopease.backend.repository.OrderRepository;
import com.shopease.backend.repository.ProductRepository;
import com.shopease.backend.repository.SystemNotificationRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class OrderService {

    private static final BigDecimal LKR_PER_BASE_UNIT = BigDecimal.valueOf(320);
    private static final BigDecimal COD_MAXIMUM_LKR = BigDecimal.valueOf(100000);

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final InventoryService inventoryService;
    private final TrackingService trackingService;
    private final SystemNotificationRepository notificationRepository;

    public OrderService(OrderRepository orderRepository, ProductRepository productRepository, InventoryService inventoryService, TrackingService trackingService, SystemNotificationRepository notificationRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.inventoryService = inventoryService;
        this.trackingService = trackingService;
        this.notificationRepository = notificationRepository;
    }

    @Transactional
    public CustomerOrder placeOrder(CustomerOrder order) {
        if (order.getItems() == null || order.getItems().isEmpty()) {
            throw new ResponseStatusException(BAD_REQUEST, "Cart is empty");
        }

        order.setId(order.getId() == null || order.getId().isBlank() ? nextOrderId() : order.getId());
        order.setDate(order.getDate() == null ? LocalDate.now() : order.getDate());
        order.setOrderStatus(valueOrDefault(order.getOrderStatus(), "PENDING"));
        order.setEstimatedDelivery(order.getEstimatedDelivery() == null ? LocalDate.now().plusDays(3) : order.getEstimatedDelivery());

        BigDecimal total = BigDecimal.ZERO;
        for (OrderItem item : order.getItems()) {
            Product product = productRepository.findById(item.getId())
                    .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Product not found: " + item.getId()));
            int requested = item.getQuantity() == null ? 0 : item.getQuantity();
            if (requested <= 0) {
                throw new ResponseStatusException(BAD_REQUEST, "Invalid quantity for " + product.getName());
            }
            int available = inventoryService.quantityFor(product.getId());
            if (requested > available) {
                throw new ResponseStatusException(BAD_REQUEST, "Only " + available + " units available for " + product.getName());
            }

            item.setName(product.getName());
            item.setPrice(product.getPrice());
            item.setImage(product.getImage());
            item.setDescription(product.getDescription());
            inventoryService.adjust(product.getId(), -requested, "SOLD", "Order " + order.getId());
            product.setStock(available - requested);
            productRepository.save(product);
            if (product.getMinStockThreshold() != null && product.getStock() <= product.getMinStockThreshold()) {
                createLowStockNotification(product);
            }
            total = total.add(product.getPrice().multiply(BigDecimal.valueOf(requested)));
        }

        BigDecimal shippingFee = total.compareTo(BigDecimal.valueOf(150)) > 0 ? BigDecimal.ZERO : BigDecimal.valueOf(5);
        BigDecimal orderTotal = total.add(shippingFee);
        if ("COD".equalsIgnoreCase(order.getPaymentMethod()) && orderTotal.multiply(LKR_PER_BASE_UNIT).compareTo(COD_MAXIMUM_LKR) > 0) {
            throw new ResponseStatusException(BAD_REQUEST, "Cash on Delivery is available only for orders up to LKR 100,000");
        }
        order.setTotalAmount(orderTotal);
        CustomerOrder saved = orderRepository.save(order);
        trackingService.changeStatus(saved.getId(), "PENDING", "Order created", "System");
        return saved;
    }

    @Transactional
    public void deleteOrder(String id) {
        CustomerOrder order = orderRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Order not found"));
        for (OrderItem item : order.getItems()) {
            Product product = productRepository.findById(item.getId()).orElse(null);
            if (product != null) {
                int quantity = item.getQuantity() == null ? 0 : item.getQuantity();
                if (quantity > 0) {
                    inventoryService.adjust(product.getId(), quantity, "RETURNED", "Order " + id + " removed by warehouse");
                    product.setStock(inventoryService.quantityFor(product.getId()));
                    productRepository.save(product);
                }
            }
        }
        orderRepository.delete(order);
    }

    private String valueOrDefault(String value, String fallback) {
        return value == null || value.isBlank() ? fallback : value;
    }

    private String nextOrderId() {
        return "ORD-" + UUID.randomUUID().toString().substring(0, 5).toUpperCase();
    }

    private void createLowStockNotification(Product product) {
        SystemNotification notification = new SystemNotification();
        notification.id = "NOT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        notification.recipientRole = "Administrator";
        notification.title = "Low stock: " + product.getName();
        notification.message = product.getName() + " has " + product.getStock() + " unit(s) remaining. Minimum level is " + product.getMinStockThreshold() + ".";
        notification.severity = "HIGH";
        notification.createdAt = java.time.LocalDateTime.now();
        notificationRepository.save(notification);
    }

}
