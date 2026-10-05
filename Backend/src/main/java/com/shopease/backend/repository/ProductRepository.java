package com.shopease.backend.repository;

import com.shopease.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, String> {

    List<Product> findByNameContainingIgnoreCase(String name);

    List<Product> findByCategory(String category);

    List<Product> findByStockLessThanEqual(Integer stock);

    boolean existsBySku(String sku);
}
