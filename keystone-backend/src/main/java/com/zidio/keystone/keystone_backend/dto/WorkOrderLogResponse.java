package com.zidio.keystone.keystone_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkOrderLogResponse {

    private Long id;
    private String status;
    private String note;
    private String changedByName;
    private LocalDateTime timestamp;
}