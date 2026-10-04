package com.shopease.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "order_tracking")
public class OrderTracking {
    @Id public String id;
    public String orderId;
    public String currentStatus;
    public String trackingNumber;
    public String deliveryNotes;
    public LocalDate estimatedDelivery;
    public LocalDateTime updatedAt;
}
