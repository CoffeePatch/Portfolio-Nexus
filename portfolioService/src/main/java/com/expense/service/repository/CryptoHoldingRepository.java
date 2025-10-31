package com.expense.service.repository;

import com.expense.service.entities.CryptoHolding;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CryptoHoldingRepository extends CrudRepository<CryptoHolding, Long> {
    List<CryptoHolding> findByUserId(String userId);
}
