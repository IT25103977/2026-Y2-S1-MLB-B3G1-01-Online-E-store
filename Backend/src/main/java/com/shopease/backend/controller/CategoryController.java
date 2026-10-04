package com.shopease.backend.controller;

import com.shopease.backend.model.Category;
import com.shopease.backend.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @PostMapping
    public Category create(@RequestBody Category category) {
        return categoryService.createCategory(category);
    }

    @PutMapping("/{id}")
    public Category update(@PathVariable String id, @RequestBody Category update) {
        return categoryService.updateCategory(id, update);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        categoryService.deleteCategory(id);
    }
}
