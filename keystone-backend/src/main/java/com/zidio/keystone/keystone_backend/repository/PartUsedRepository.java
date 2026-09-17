package com.zidio.keystone.keystone_backend.repository;

import com.zidio.keystone.keystone_backend.entity.PartUsed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PartUsedRepository extends JpaRepository<PartUsed, Long> {

    List<PartUsed> findByWorkOrderId(Long workOrderId);
}