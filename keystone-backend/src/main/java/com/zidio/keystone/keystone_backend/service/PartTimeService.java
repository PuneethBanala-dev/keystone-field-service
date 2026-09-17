package com.zidio.keystone.keystone_backend.service;

import com.zidio.keystone.keystone_backend.dto.*;
import com.zidio.keystone.keystone_backend.entity.PartUsed;
import com.zidio.keystone.keystone_backend.entity.Technician;
import com.zidio.keystone.keystone_backend.entity.TimeEntry;
import com.zidio.keystone.keystone_backend.entity.WorkOrder;
import com.zidio.keystone.keystone_backend.repository.PartUsedRepository;
import com.zidio.keystone.keystone_backend.repository.TechnicianRepository;
import com.zidio.keystone.keystone_backend.repository.TimeEntryRepository;
import com.zidio.keystone.keystone_backend.repository.WorkOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PartTimeService {

    private final WorkOrderRepository workOrderRepository;
    private final TechnicianRepository technicianRepository;
    private final PartUsedRepository partUsedRepository;
    private final TimeEntryRepository timeEntryRepository;

    public PartUsedResponse addPart(Long workOrderId, PartUsedRequest request) {
        WorkOrder workOrder = workOrderRepository.findById(workOrderId)
                .orElseThrow(() -> new RuntimeException("Work order not found"));

        PartUsed part = PartUsed.builder()
                .workOrder(workOrder)
                .partName(request.getPartName())
                .quantity(request.getQuantity())
                .cost(request.getCost())
                .build();

        partUsedRepository.save(part);
        return toPartResponse(part);
    }

    public List<PartUsedResponse> getPartsForWorkOrder(Long workOrderId) {
        return partUsedRepository.findByWorkOrderId(workOrderId).stream()
                .map(this::toPartResponse)
                .collect(Collectors.toList());
    }

    public TimeEntryResponse startTime(Long workOrderId, TimeEntryRequest request) {
        WorkOrder workOrder = workOrderRepository.findById(workOrderId)
                .orElseThrow(() -> new RuntimeException("Work order not found"));

        Technician technician = technicianRepository.findById(request.getTechnicianId())
                .orElseThrow(() -> new RuntimeException("Technician not found"));

        TimeEntry entry = TimeEntry.builder()
                .workOrder(workOrder)
                .technician(technician)
                .startTime(LocalDateTime.now())
                .build();

        timeEntryRepository.save(entry);
        return toTimeResponse(entry);
    }

    public TimeEntryResponse stopTime(Long timeEntryId) {
        TimeEntry entry = timeEntryRepository.findById(timeEntryId)
                .orElseThrow(() -> new RuntimeException("Time entry not found"));

        entry.setEndTime(LocalDateTime.now());
        timeEntryRepository.save(entry);
        return toTimeResponse(entry);
    }

    public List<TimeEntryResponse> getTimeEntriesForWorkOrder(Long workOrderId) {
        return timeEntryRepository.findByWorkOrderId(workOrderId).stream()
                .map(this::toTimeResponse)
                .collect(Collectors.toList());
    }

    private PartUsedResponse toPartResponse(PartUsed part) {
        return PartUsedResponse.builder()
                .id(part.getId())
                .workOrderId(part.getWorkOrder().getId())
                .partName(part.getPartName())
                .quantity(part.getQuantity())
                .cost(part.getCost())
                .build();
    }

    private TimeEntryResponse toTimeResponse(TimeEntry entry) {
        return TimeEntryResponse.builder()
                .id(entry.getId())
                .workOrderId(entry.getWorkOrder().getId())
                .technicianId(entry.getTechnician().getId())
                .technicianName(entry.getTechnician().getUser().getName())
                .startTime(entry.getStartTime())
                .endTime(entry.getEndTime())
                .build();
    }
}