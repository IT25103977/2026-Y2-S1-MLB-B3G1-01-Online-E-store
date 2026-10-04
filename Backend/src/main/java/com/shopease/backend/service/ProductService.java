package com.shopease.backend.service;

import com.shopease.backend.model.InventoryItem;
import com.shopease.backend.model.Product;
import com.shopease.backend.repository.ProductRepository;
import com.shopease.backend.service.product.factory.ProductFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;
//    private final InventoryService inventoryService;
    private final ProductFactory productFactory;

    public ProductService(ProductRepository productRepository, /*InventoryService inventoryService,*/
                          ProductFactory productFactory) {
        this.productRepository = productRepository;
//        this.inventoryService = inventoryService;
        this.productFactory = productFactory;
    }

    public List<Product> getAllProducts(String sortBy) {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }

    public Product createProduct(Product source) {
        // FACTORY PATTERN: Encapsulates creation logic and defaults
        Product product = productFactory.createProduct(source);
        
        int openingStock = source.getStock() == null ? 0 : source.getStock();
        int minimumStock = source.getMinStockThreshold() == null ? 5 : source.getMinStockThreshold();
        
        Product saved = productRepository.save(product);
        
//        InventoryItem inventory = new InventoryItem();
//        inventory.productId = saved.getId();
//        inventory.quantityOnHand = openingStock;
//        inventory.minimumStockLevel = minimumStock;
//        inventory.maximumStockLevel = Math.max(openingStock + 20, minimumStock * 2);
//        inventoryService.create(inventory);
        
        saved.setStock(openingStock);
        saved.setMinStockThreshold(minimumStock);
        
        return productRepository.save(saved);
    }

    public Optional<Product> updateProduct(String id, Product updatedProduct) {
        return productRepository.findById(id).map(product -> {
            product.setName(updatedProduct.getName());
            product.setCategory(updatedProduct.getCategory());
            product.setPrice(updatedProduct.getPrice());
            product.setOriginalPrice(updatedProduct.getOriginalPrice());
            product.setDiscountPercent(updatedProduct.getDiscountPercent());
            product.setRating(updatedProduct.getRating());
            product.setReviewsCount(updatedProduct.getReviewsCount());
            product.setFlashSale(updatedProduct.getFlashSale());
            product.setExpressDelivery(updatedProduct.getExpressDelivery());
            product.setBrand(updatedProduct.getBrand());
            product.setImage(updatedProduct.getImage());
            product.setDescription(updatedProduct.getDescription());
            product.setSku(updatedProduct.getSku());

            if (updatedProduct.getStock() != null) {
//                int currentStock = inventoryService.quantityFor(id);
//                int adjustment = updatedProduct.getStock() - currentStock;
//                if (adjustment != 0) {
//                    inventoryService.adjust(id, adjustment, "ADJUSTMENT", "Catalog stock correction");
//                }
                product.setStock(updatedProduct.getStock());
            }
            if (updatedProduct.getMinStockThreshold() != null) {
                product.setMinStockThreshold(updatedProduct.getMinStockThreshold());
            }

            return productRepository.save(product);
        });
    }

    public boolean deleteProduct(String id) {
        if (!productRepository.existsById(id)) {
            return false;
        }
        productRepository.deleteById(id);
        return true;
    }

    public Product restockProduct(String id, int amount) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
//        inventoryService.adjust(product.getId(), amount, "RECEIVED", "Legacy product restock action");
//        product.setStock(inventoryService.quantityFor(product.getId()));
        return productRepository.save(product);
    }
}
