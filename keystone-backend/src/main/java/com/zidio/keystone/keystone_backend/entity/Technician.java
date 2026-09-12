package com.zidio.keystone.keystone_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "technicians")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Technician {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    private String skills;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private TechnicianStatus status = TechnicianStatus.AVAILABLE;

    public enum TechnicianStatus {
        AVAILABLE,
        ON_JOB,
        OFF_DUTY
    }
}