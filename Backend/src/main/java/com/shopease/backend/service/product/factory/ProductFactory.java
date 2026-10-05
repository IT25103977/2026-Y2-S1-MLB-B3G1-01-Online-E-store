package com.shopease.backend.service.product.factory;

import com.shopease.backend.model.Product;
import com.shopease.backend.util.IdGenerator;
import org.springframework.stereotype.Component;

/**
 * ==========================================
 * DESIGN PATTERN: FACTORY METHOD
 * ==========================================
 * Encapsulates the complex creation logic of a Product, setting default values 
 * and generating the ID securely via the Singleton IdGenerator.
 */
@Component
public class ProductFactory {
    
    public Product createProduct(Product source) {
        Product product = new Product();
        product.setId(IdGenerator.getInstance().generateId("PROD")); // Singleton Pattern used here
        product.setName(source.getName());
        product.setCategory(source.getCategory());
        product.setPrice(source.getPrice());
        product.setOriginalPrice(source.getOriginalPrice());
        product.setDiscountPercent(source.getDiscountPercent());
        product.setRating(source.getRating() == null ? 0.0 : source.getRating());
        product.setReviewsCount(source.getReviewsCount() == null ? 0 : source.getReviewsCount());
        product.setFlashSale(source.getFlashSale() == null ? false : source.getFlashSale());
        product.setExpressDelivery(source.getExpressDelivery() == null ? false : source.getExpressDelivery());
        product.setBrand(source.getBrand());
        product.setImage(source.getImage());
        product.setDescription(source.getDescription());
        product.setSku(source.getSku());
        
        // Defaults for inventory which will be handled after creation
        product.setStock(0);
        product.setMinStockThreshold(source.getMinStockThreshold() == null ? 5 : source.getMinStockThreshold());
        
        return product;
    }
}
