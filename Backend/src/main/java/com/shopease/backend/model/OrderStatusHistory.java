package com.shopease.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "order_status_history")
public class OrderStatusHistory {
    @Id public String id;
    public String orderId;
    public String status;
    public String note;
    public String changedBy;
    public LocalDateTime changedAt;
}
