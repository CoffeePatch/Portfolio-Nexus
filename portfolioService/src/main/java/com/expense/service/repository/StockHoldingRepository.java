package com.expense.service.repository;

import com.expense.service.entities.StockHolding;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockHoldingRepository extends CrudRepository<StockHolding, Long> {
    List<StockHolding> findByUserId(String userId);
}
