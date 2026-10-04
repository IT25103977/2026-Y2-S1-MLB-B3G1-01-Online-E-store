package com.shopease.backend.repository;

import com.shopease.backend.model.CustomerOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<CustomerOrder, String> {

    List<CustomerOrder> findByCustomerEmailIgnoreCaseOrderByDateDesc(String customerEmail);

    Optional<CustomerOrder> findByTrackingNumber(String trackingNumber);
}
