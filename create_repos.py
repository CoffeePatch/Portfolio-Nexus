import os

# Create repository directory
repo_dir = r"portfolioService\src\main\java\com\expense\service\repository"
os.makedirs(repo_dir, exist_ok=True)

# File templates
files = {
    "StockHoldingRepository.java": """package com.expense.service.repository;

import com.expense.service.entities.StockHolding;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockHoldingRepository extends CrudRepository<StockHolding, Long> {
}
""",
    "MutualFundHoldingRepository.java": """package com.expense.service.repository;

import com.expense.service.entities.MutualFundHolding;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MutualFundHoldingRepository extends CrudRepository<MutualFundHolding, Long> {
}
""",
    "CryptoHoldingRepository.java": """package com.expense.service.repository;

import com.expense.service.entities.CryptoHolding;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CryptoHoldingRepository extends CrudRepository<CryptoHolding, Long> {
}
""",
    "ManualHoldingRepository.java": """package com.expense.service.repository;

import com.expense.service.entities.ManualHolding;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManualHoldingRepository extends CrudRepository<ManualHolding, Long> {
}
"""
}

# Create all files
for filename, content in files.items():
    filepath = os.path.join(repo_dir, filename)
    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Created: {filepath}")

print("\nAll repository interfaces created successfully!")
