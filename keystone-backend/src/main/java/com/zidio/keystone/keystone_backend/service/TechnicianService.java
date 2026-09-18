package com.zidio.keystone.keystone_backend.service;

import com.zidio.keystone.keystone_backend.dto.TechnicianResponse;
import com.zidio.keystone.keystone_backend.repository.TechnicianRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TechnicianService {

    private final TechnicianRepository technicianRepository;

    public List<TechnicianResponse> getAllTechnicians() {
        return technicianRepository.findAll().stream()
                .map(tech -> TechnicianResponse.builder()
                        .id(tech.getId())
                        .name(tech.getUser().getName())
                        .email(tech.getUser().getEmail())
                        .skills(tech.getSkills())
                        .status(tech.getStatus().name())
                        .build())
                .collect(Collectors.toList());
    }
}