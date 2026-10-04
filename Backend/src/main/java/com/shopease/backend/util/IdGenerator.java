package com.shopease.backend.util;

import java.util.UUID;

/**
 * ==========================================
 * DESIGN PATTERN: SINGLETON
 * ==========================================
 * This class ensures that only one instance of the IdGenerator is created.
 * It provides a global point of access to that instance.
 */
public class IdGenerator {
    // 1. Private static instance of the same class
    private static IdGenerator instance;

    // 2. Private constructor to prevent instantiation
    private IdGenerator() {
    }

    // 3. Public static method to provide access to the instance
    public static synchronized IdGenerator getInstance() {
        if (instance == null) {
            instance = new IdGenerator();
        }
        return instance;
    }

    public String generateId(String prefix) {
        return prefix + "-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}
