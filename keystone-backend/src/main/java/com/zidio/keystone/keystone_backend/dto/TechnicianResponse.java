package com.zidio.keystone.keystone_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TechnicianResponse {

    private Long id;
    private String name;
    private String email;
    private String skills;
    private String status;
}