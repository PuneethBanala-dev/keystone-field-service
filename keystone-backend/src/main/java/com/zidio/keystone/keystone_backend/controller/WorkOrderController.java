package com.zidio.keystone.keystone_backend.controller;

import com.zidio.keystone.keystone_backend.dto.*;
import com.zidio.keystone.keystone_backend.service.WorkOrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/work-orders")
@RequiredArgsConstructor
public class WorkOrderController {

    private final WorkOrderService workOrderService;

    @GetMapping("/{id}/logs")
    public ResponseEntity<List<WorkOrderLogResponse>> getLogs(@PathVariable Long id) {
        return ResponseEntity.ok(workOrderService.getLogsForWorkOrder(id));
    }

    @PostMapping
    public ResponseEntity<WorkOrderResponse> create(@Valid @RequestBody WorkOrderRequest request) {
        return ResponseEntity.ok(workOrderService.createWorkOrder(request));
    }

    @GetMapping
    public ResponseEntity<List<WorkOrderResponse>> getAll() {
        return ResponseEntity.ok(workOrderService.getAllWorkOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkOrderResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(workOrderService.getWorkOrderById(id));
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<WorkOrderResponse>> getByCustomer(@PathVariable Long customerId) {
        return ResponseEntity.ok(workOrderService.getWorkOrdersByCustomer(customerId));
    }

    @GetMapping("/technician/{technicianId}")
    public ResponseEntity<List<WorkOrderResponse>> getByTechnician(@PathVariable Long technicianId) {
        return ResponseEntity.ok(workOrderService.getWorkOrdersByTechnician(technicianId));
    }

    @PutMapping("/{id}/assign")
    public ResponseEntity<WorkOrderResponse> assignTechnician(
            @PathVariable Long id,
            @Valid @RequestBody AssignTechnicianRequest request) {
        return ResponseEntity.ok(workOrderService.assignTechnician(id, request));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<WorkOrderResponse> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody StatusUpdateRequest request) {
        return ResponseEntity.ok(workOrderService.updateStatus(id, request));
    }
}