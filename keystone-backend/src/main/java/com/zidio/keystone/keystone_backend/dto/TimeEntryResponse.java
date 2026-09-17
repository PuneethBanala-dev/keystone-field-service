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
public class TimeEntryResponse {

    private Long id;
    private Long workOrderId;
    private Long technicianId;
    private String technicianName;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}