package com.zidio.keystone.keystone_backend.repository;

import com.zidio.keystone.keystone_backend.entity.TimeEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimeEntryRepository extends JpaRepository<TimeEntry, Long> {

    List<TimeEntry> findByWorkOrderId(Long workOrderId);
}