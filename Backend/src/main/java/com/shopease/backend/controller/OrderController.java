package com.shopease.backend.controller;

import com.shopease.backend.model.CustomerOrder;
import com.shopease.backend.repository.OrderRepository;
import com.shopease.backend.service.OrderService;
import com.shopease.backend.service.TrackingService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderRepository orderRepository;
    private final OrderService orderService;
    private final TrackingService trackingService;

    public OrderController(OrderRepository orderRepository, OrderService orderService, TrackingService trackingService) {
        this.orderRepository = orderRepository;
        this.orderService = orderService;
        this.trackingService = trackingService;
    }

    @GetMapping
    public List<CustomerOrder> getOrders(@RequestParam(required = false) String customerEmail) {
        if (customerEmail != null && !customerEmail.isBlank()) {
            return orderRepository.findByCustomerEmailIgnoreCaseOrderByDateDesc(customerEmail);
        }
        return orderRepository.findAll();
    }

    @GetMapping("/{id}")
    public CustomerOrder getOrder(@PathVariable String id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Order not found"));
    }

    @GetMapping("/track/{trackingNumber}")
    public CustomerOrder getByTrackingNumber(@PathVariable String trackingNumber) {
        return orderRepository.findByTrackingNumber(trackingNumber)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Tracking number not found"));
    }

    @PostMapping
    public CustomerOrder placeOrder(@RequestBody CustomerOrder order) {
        return orderService.placeOrder(order);
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable String id) {
        orderService.deleteOrder(id);
    }

    @PatchMapping("/{id}/status")
    public CustomerOrder updateStatus(@PathVariable String id, @RequestBody Map<String, String> payload) {
        CustomerOrder order = getOrder(id);
        var tracking = trackingService.changeStatus(id, payload.getOrDefault("orderStatus", "Processing"), payload.get("note"), payload.get("changedBy"));
        order.setOrderStatus(tracking.currentStatus);
        order.setTrackingNumber(tracking.trackingNumber);
        order.setEstimatedDelivery(tracking.estimatedDelivery);
        return orderRepository.save(order);
    }
}
