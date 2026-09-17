package com.zidio.keystone.keystone_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "parts_used")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PartUsed {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "work_order_id", nullable = false)
    private WorkOrder workOrder;

    @Column(nullable = false)
    private String partName;

    @Column(nullable = false)
    private Integer quantity;

    private BigDecimal cost;
}