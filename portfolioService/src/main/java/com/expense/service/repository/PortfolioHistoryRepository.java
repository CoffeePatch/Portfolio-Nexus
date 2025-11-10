package com.expense.service.repository;

import com.expense.service.entities.PortfolioHistory;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.List;

public interface PortfolioHistoryRepository extends CrudRepository<PortfolioHistory, Long> {
    List<PortfolioHistory> findByUserIdAndSnapshotDateAfter(String userId, LocalDate startDate);
}
