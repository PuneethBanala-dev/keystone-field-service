package com.zidio.keystone.keystone_backend.service;

import com.zidio.keystone.keystone_backend.dto.DashboardSummaryResponse;
import com.zidio.keystone.keystone_backend.entity.Technician;
import com.zidio.keystone.keystone_backend.entity.WorkOrder;
import com.zidio.keystone.keystone_backend.repository.TechnicianRepository;
import com.zidio.keystone.keystone_backend.repository.WorkOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final WorkOrderRepository workOrderRepository;
    private final TechnicianRepository technicianRepository;

    public DashboardSummaryResponse getSummary() {

        long slaBreached = workOrderRepository.findAll().stream()
                .filter(wo -> wo.getSlaDeadline() != null
                        && wo.getSlaDeadline().isBefore(LocalDateTime.now())
                        && wo.getStatus() != WorkOrder.Status.COMPLETED
                        && wo.getStatus() != WorkOrder.Status.CANCELLED)
                .count();

        return DashboardSummaryResponse.builder()
                .totalWorkOrders(workOrderRepository.count())
                .openCount(workOrderRepository.countByStatus(WorkOrder.Status.OPEN))
                .assignedCount(workOrderRepository.countByStatus(WorkOrder.Status.ASSIGNED))
                .inProgressCount(workOrderRepository.countByStatus(WorkOrder.Status.IN_PROGRESS))
                .completedCount(workOrderRepository.countByStatus(WorkOrder.Status.COMPLETED))
                .cancelledCount(workOrderRepository.countByStatus(WorkOrder.Status.CANCELLED))
                .slaBreachedCount(slaBreached)
                .totalTechnicians(technicianRepository.count())
                .availableTechnicians(technicianRepository.countByStatus(Technician.TechnicianStatus.AVAILABLE))
                .build();
    }
}