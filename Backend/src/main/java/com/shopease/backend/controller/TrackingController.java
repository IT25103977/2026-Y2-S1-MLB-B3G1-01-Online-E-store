package com.shopease.backend.controller;

import com.shopease.backend.model.DeliveryAssignment;
import com.shopease.backend.model.OrderStatusHistory;
import com.shopease.backend.model.OrderTracking;
import com.shopease.backend.repository.DeliveryAssignmentRepository;
import com.shopease.backend.service.TrackingService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tracking")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class TrackingController {
    private final TrackingService service; private final DeliveryAssignmentRepository assignments;
    public TrackingController(TrackingService service, DeliveryAssignmentRepository assignments) { this.service = service; this.assignments = assignments; }
    @GetMapping("/{orderId}") public OrderTracking get(@PathVariable String orderId) { return service.get(orderId); }
    @GetMapping("/{orderId}/history") public List<OrderStatusHistory> history(@PathVariable String orderId) { return service.history(orderId); }
    @PatchMapping("/{orderId}/status") public OrderTracking status(@PathVariable String orderId, @RequestBody Map<String, String> body) { return service.changeStatus(orderId, body.get("status"), body.get("note"), body.get("changedBy")); }
    @PostMapping("/assignments") public DeliveryAssignment assign(@RequestBody DeliveryAssignment assignment) { return service.assign(assignment); }
    @GetMapping("/assignments/staff/{email}") public List<DeliveryAssignment> assignments(@PathVariable String email) { return assignments.findByDeliveryStaffEmail(email); }
}
