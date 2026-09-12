package com.zidio.keystone.keystone_backend.repository;

import com.zidio.keystone.keystone_backend.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Optional<Customer> findByUserId(Long userId);
}