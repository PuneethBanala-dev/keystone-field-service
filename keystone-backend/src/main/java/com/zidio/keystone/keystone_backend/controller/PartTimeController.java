package com.zidio.keystone.keystone_backend.controller;

import com.zidio.keystone.keystone_backend.dto.*;
import com.zidio.keystone.keystone_backend.service.PartTimeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/work-orders/{workOrderId}")
@RequiredArgsConstructor
public class PartTimeController {

    private final PartTimeService partTimeService;

    @PostMapping("/parts")
    public ResponseEntity<PartUsedResponse> addPart(
            @PathVariable Long workOrderId,
            @Valid @RequestBody PartUsedRequest request) {
        return ResponseEntity.ok(partTimeService.addPart(workOrderId, request));
    }

    @GetMapping("/parts")
    public ResponseEntity<List<PartUsedResponse>> getParts(@PathVariable Long workOrderId) {
        return ResponseEntity.ok(partTimeService.getPartsForWorkOrder(workOrderId));
    }

    @PostMapping("/time/start")
    public ResponseEntity<TimeEntryResponse> startTime(
            @PathVariable Long workOrderId,
            @Valid @RequestBody TimeEntryRequest request) {
        return ResponseEntity.ok(partTimeService.startTime(workOrderId, request));
    }

    @PutMapping("/time/{timeEntryId}/stop")
    public ResponseEntity<TimeEntryResponse> stopTime(
            @PathVariable Long workOrderId,
            @PathVariable Long timeEntryId) {
        return ResponseEntity.ok(partTimeService.stopTime(timeEntryId));
    }

    @GetMapping("/time")
    public ResponseEntity<List<TimeEntryResponse>> getTimeEntries(@PathVariable Long workOrderId) {
        return ResponseEntity.ok(partTimeService.getTimeEntriesForWorkOrder(workOrderId));
    }
}