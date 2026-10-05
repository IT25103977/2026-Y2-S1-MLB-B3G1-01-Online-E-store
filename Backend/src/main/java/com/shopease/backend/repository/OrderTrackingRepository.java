package com.shopease.backend.repository;
import com.shopease.backend.model.OrderTracking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface OrderTrackingRepository extends JpaRepository<OrderTracking, String> { Optional<OrderTracking> findByOrderId(String orderId); }
