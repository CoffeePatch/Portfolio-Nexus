package com.expense.service.repository;

import com.expense.service.entities.MutualFundHolding;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MutualFundHoldingRepository extends CrudRepository<MutualFundHolding, Long> {
    List<MutualFundHolding> findByUserId(String userId);
}
