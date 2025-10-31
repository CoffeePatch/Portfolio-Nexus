package main

import (
	"fmt"
	"os"
	"path/filepath"
)

func main() {
	// Create repository directory
	repoDir := filepath.Join("portfolioService", "src", "main", "java", "com", "expense", "service", "repository")
	err := os.MkdirAll(repoDir, 0755)
	if err != nil {
		fmt.Printf("Error creating directory: %v\n", err)
		return
	}
	fmt.Printf("Created directory: %s\n", repoDir)

	// File templates
	files := map[string]string{
		"StockHoldingRepository.java": `package com.expense.service.repository;

import com.expense.service.entities.StockHolding;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockHoldingRepository extends CrudRepository<StockHolding, Long> {
}
`,
		"MutualFundHoldingRepository.java": `package com.expense.service.repository;

import com.expense.service.entities.MutualFundHolding;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MutualFundHoldingRepository extends CrudRepository<MutualFundHolding, Long> {
}
`,
		"CryptoHoldingRepository.java": `package com.expense.service.repository;

import com.expense.service.entities.CryptoHolding;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CryptoHoldingRepository extends CrudRepository<CryptoHolding, Long> {
}
`,
		"ManualHoldingRepository.java": `package com.expense.service.repository;

import com.expense.service.entities.ManualHolding;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManualHoldingRepository extends CrudRepository<ManualHolding, Long> {
}
`,
	}

	// Create all files
	for filename, content := range files {
		filepath := filepath.Join(repoDir, filename)
		err := os.WriteFile(filepath, []byte(content), 0644)
		if err != nil {
			fmt.Printf("Error creating %s: %v\n", filename, err)
			continue
		}
		fmt.Printf("Created: %s\n", filepath)
	}

	fmt.Println("\nAll repository interfaces created successfully!")
}
