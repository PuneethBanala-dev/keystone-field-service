package com.zidio.keystone.keystone_backend.controller;

import com.zidio.keystone.keystone_backend.dto.TechnicianResponse;
import com.zidio.keystone.keystone_backend.service.TechnicianService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/technicians")
@RequiredArgsConstructor
public class TechnicianController {

    private final TechnicianService technicianService;

    @GetMapping
    public ResponseEntity<List<TechnicianResponse>> getAll() {
        return ResponseEntity.ok(technicianService.getAllTechnicians());
    }
}