package com.shopease.backend.repository;
import com.shopease.backend.model.OrderStatusHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface OrderStatusHistoryRepository extends JpaRepository<OrderStatusHistory, String> { List<OrderStatusHistory> findByOrderIdOrderByChangedAtAsc(String orderId); }
