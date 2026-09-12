package com.zidio.keystone.keystone_backend.repository;

import com.zidio.keystone.keystone_backend.entity.Technician;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TechnicianRepository extends JpaRepository<Technician, Long> {

    Optional<Technician> findByUserId(Long userId);
}