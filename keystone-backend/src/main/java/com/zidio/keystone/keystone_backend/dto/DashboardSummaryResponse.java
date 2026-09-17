package com.zidio.keystone.keystone_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardSummaryResponse {

    private long totalWorkOrders;
    private long openCount;
    private long assignedCount;
    private long inProgressCount;
    private long completedCount;
    private long cancelledCount;
    private long slaBreachedCount;
    private long totalTechnicians;
    private long availableTechnicians;
}