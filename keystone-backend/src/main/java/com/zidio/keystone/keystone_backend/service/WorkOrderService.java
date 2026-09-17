package com.zidio.keystone.keystone_backend.service;

import com.zidio.keystone.keystone_backend.dto.*;
import com.zidio.keystone.keystone_backend.entity.Customer;
import com.zidio.keystone.keystone_backend.entity.Technician;
import com.zidio.keystone.keystone_backend.entity.WorkOrder;
import com.zidio.keystone.keystone_backend.repository.CustomerRepository;
import com.zidio.keystone.keystone_backend.repository.TechnicianRepository;
import com.zidio.keystone.keystone_backend.repository.WorkOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkOrderService {

    private final WorkOrderRepository workOrderRepository;
    private final CustomerRepository customerRepository;
    private final TechnicianRepository technicianRepository;

    public WorkOrderResponse createWorkOrder(WorkOrderRequest request) {
        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        WorkOrder workOrder = WorkOrder.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .customer(customer)
                .priority(request.getPriority() != null ? request.getPriority() : WorkOrder.Priority.MEDIUM)
                .slaDeadline(request.getSlaDeadline())
                .build();

        workOrderRepository.save(workOrder);
        return toResponse(workOrder);
    }

    public List<WorkOrderResponse> getAllWorkOrders() {
        return workOrderRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public WorkOrderResponse getWorkOrderById(Long id) {
        WorkOrder workOrder = workOrderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Work order not found"));
        return toResponse(workOrder);
    }

    public List<WorkOrderResponse> getWorkOrdersByCustomer(Long customerId) {
        return workOrderRepository.findByCustomerId(customerId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<WorkOrderResponse> getWorkOrdersByTechnician(Long technicianId) {
        return workOrderRepository.findByTechnicianId(technicianId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public WorkOrderResponse assignTechnician(Long workOrderId, AssignTechnicianRequest request) {
        WorkOrder workOrder = workOrderRepository.findById(workOrderId)
                .orElseThrow(() -> new RuntimeException("Work order not found"));

        Technician technician = technicianRepository.findById(request.getTechnicianId())
                .orElseThrow(() -> new RuntimeException("Technician not found"));

        workOrder.setTechnician(technician);
        workOrder.setStatus(WorkOrder.Status.ASSIGNED);

        workOrderRepository.save(workOrder);
        return toResponse(workOrder);
    }

    public WorkOrderResponse updateStatus(Long workOrderId, StatusUpdateRequest request) {
        WorkOrder workOrder = workOrderRepository.findById(workOrderId)
                .orElseThrow(() -> new RuntimeException("Work order not found"));

        workOrder.setStatus(request.getStatus());
        workOrderRepository.save(workOrder);
        return toResponse(workOrder);
    }

    private WorkOrderResponse toResponse(WorkOrder workOrder) {
        return WorkOrderResponse.builder()
                .id(workOrder.getId())
                .title(workOrder.getTitle())
                .description(workOrder.getDescription())
                .customerId(workOrder.getCustomer().getId())
                .customerName(workOrder.getCustomer().getUser().getName())
                .technicianId(workOrder.getTechnician() != null ? workOrder.getTechnician().getId() : null)
                .technicianName(
                        workOrder.getTechnician() != null ? workOrder.getTechnician().getUser().getName() : null)
                .status(workOrder.getStatus())
                .priority(workOrder.getPriority())
                .slaDeadline(workOrder.getSlaDeadline())
                .createdAt(workOrder.getCreatedAt())
                .updatedAt(workOrder.getUpdatedAt())
                .build();
    }
}