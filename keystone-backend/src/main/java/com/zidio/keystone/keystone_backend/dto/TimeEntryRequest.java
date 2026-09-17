package com.zidio.keystone.keystone_backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TimeEntryRequest {

    @NotNull(message = "Technician ID is required")
    private Long technicianId;
}