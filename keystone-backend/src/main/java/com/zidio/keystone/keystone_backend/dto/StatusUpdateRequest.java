package com.zidio.keystone.keystone_backend.dto;

import com.zidio.keystone.keystone_backend.entity.WorkOrder;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class StatusUpdateRequest {

    @NotNull(message = "Status is required")
    private WorkOrder.Status status;
}