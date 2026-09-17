package com.zidio.keystone.keystone_backend.dto;

import com.zidio.keystone.keystone_backend.entity.WorkOrder;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkOrderResponse {

    private Long id;
    private String title;
    private String description;
    private Long customerId;
    private String customerName;
    private Long technicianId;
    private String technicianName;
    private WorkOrder.Status status;
    private WorkOrder.Priority priority;
    private LocalDateTime slaDeadline;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}