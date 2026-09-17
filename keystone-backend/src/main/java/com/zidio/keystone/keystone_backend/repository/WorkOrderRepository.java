package com.zidio.keystone.keystone_backend.repository;

import com.zidio.keystone.keystone_backend.entity.WorkOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkOrderRepository extends JpaRepository<WorkOrder, Long> {

    List<WorkOrder> findByCustomerId(Long customerId);

    List<WorkOrder> findByTechnicianId(Long technicianId);

    List<WorkOrder> findByStatus(WorkOrder.Status status);

    long countByStatus(WorkOrder.Status status);
}