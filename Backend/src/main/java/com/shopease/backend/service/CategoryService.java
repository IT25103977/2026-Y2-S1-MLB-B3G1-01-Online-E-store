package com.shopease.backend.service;

import com.shopease.backend.model.Category;
import com.shopease.backend.repository.CategoryRepository;
import com.shopease.backend.util.IdGenerator;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category createCategory(Category category) {
        if (category.getName() == null || category.getName().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Category name is required");
        }
        
        // SINGLETON PATTERN: Use global IdGenerator
        if (category.getId() == null || category.getId().isBlank()) {
            String safeName = category.getName().toLowerCase().replaceAll("[^a-z0-9]+", "-");
            category.setId(IdGenerator.getInstance().generateId("CAT-" + safeName));
        }
        
        if (categoryRepository.existsById(category.getId())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Category ID already exists");
        }
        
        if (category.getActive() == null) {
            category.setActive(true);
        }
        
        return categoryRepository.save(category);
    }

    public Category updateCategory(String id, Category update) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));
                
        category.setName(update.getName()); 
        category.setIcon(update.getIcon()); 
        category.setBg(update.getBg()); 
        category.setDescription(update.getDescription());
        
        if (update.getActive() != null) {
            category.setActive(update.getActive());
        }
        return categoryRepository.save(category);
    }

    public void deleteCategory(String id) {
        if ("all".equals(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The All Categories item cannot be deleted");
        }
        if (!categoryRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found");
        }
        categoryRepository.deleteById(id);
    }
}
