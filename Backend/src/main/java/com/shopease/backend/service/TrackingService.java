package com.shopease.backend.service;

import com.shopease.backend.model.DeliveryAssignment;
import com.shopease.backend.model.OrderStatusHistory;
import com.shopease.backend.model.OrderTracking;
import com.shopease.backend.repository.DeliveryAssignmentRepository;
import com.shopease.backend.repository.OrderRepository;
import com.shopease.backend.repository.OrderStatusHistoryRepository;
import com.shopease.backend.repository.OrderTrackingRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class TrackingService {
    private final OrderTrackingRepository tracking; private final OrderStatusHistoryRepository history; private final DeliveryAssignmentRepository assignments; private final OrderRepository orders;
    public TrackingService(OrderTrackingRepository tracking, OrderStatusHistoryRepository history, DeliveryAssignmentRepository assignments, OrderRepository orders) { this.tracking = tracking; this.history = history; this.assignments = assignments; this.orders = orders; }
    public OrderTracking get(String orderId) { return tracking.findByOrderId(orderId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tracking record not found")); }
    public List<OrderStatusHistory> history(String orderId) { return history.findByOrderIdOrderByChangedAtAsc(orderId); }
    public OrderTracking changeStatus(String orderId, String status, String note, String changedBy) {
        if (!orders.existsById(orderId)) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found");
        if (status == null || status.isBlank()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A delivery status is required");
        OrderTracking record = tracking.findByOrderId(orderId).orElseGet(() -> { OrderTracking value = new OrderTracking(); value.id = id("TRK"); value.orderId = orderId; value.trackingNumber = id("HB-TRACK"); return value; });
        record.currentStatus = status; record.deliveryNotes = note; record.updatedAt = LocalDateTime.now(); tracking.save(record);
        OrderStatusHistory event = new OrderStatusHistory(); event.id = id("HIS"); event.orderId = orderId; event.status = status; event.note = note; event.changedBy = changedBy == null ? "System" : changedBy; event.changedAt = LocalDateTime.now(); history.save(event);
        return record;
    }
    public DeliveryAssignment assign(DeliveryAssignment assignment) {
        if (assignment == null || assignment.orderId == null || assignment.deliveryStaffEmail == null) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Order ID and delivery staff are required");
        if (!orders.existsById(assignment.orderId)) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found");
        assignment.id = assignment.id == null || assignment.id.isBlank() ? id("DEL") : assignment.id; assignment.status = assignment.status == null ? "ASSIGNED" : assignment.status; assignment.assignedAt = LocalDateTime.now(); return assignments.save(assignment);
    }
    private String id(String prefix) { return prefix + "-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase(); }
}
