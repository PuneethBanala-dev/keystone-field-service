package com.zidio.keystone.keystone_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class PartUsedRequest {

    @NotBlank(message = "Part name is required")
    private String partName;

    @NotNull(message = "Quantity is required")
    private Integer quantity;

    private BigDecimal cost;
}