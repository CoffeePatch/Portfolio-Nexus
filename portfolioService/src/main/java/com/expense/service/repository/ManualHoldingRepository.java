package com.expense.service.repository;

import com.expense.service.entities.ManualHolding;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ManualHoldingRepository extends CrudRepository<ManualHolding, Long> {
    List<ManualHolding> findByUserId(String userId);
}
