package com.zidio.keystone.keystone_backend.dto;

import com.zidio.keystone.keystone_backend.entity.WorkOrder;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class WorkOrderRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @NotNull(message = "Customer ID is required")
    private Long customerId;

    private WorkOrder.Priority priority;

    private LocalDateTime slaDeadline;
}