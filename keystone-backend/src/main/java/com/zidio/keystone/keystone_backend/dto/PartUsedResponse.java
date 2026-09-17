package com.zidio.keystone.keystone_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PartUsedResponse {

    private Long id;
    private Long workOrderId;
    private String partName;
    private Integer quantity;
    private BigDecimal cost;
}