const fs = require('fs');
const path = require('path');

// Create repository directory
const repoDir = path.join('portfolioService', 'src', 'main', 'java', 'com', 'expense', 'service', 'repository');
fs.mkdirSync(repoDir, { recursive: true });
console.log(`Created directory: ${repoDir}`);

// File templates
const files = {
    'StockHoldingRepository.java': `package com.expense.service.repository;

import com.expense.service.entities.StockHolding;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockHoldingRepository extends CrudRepository<StockHolding, Long> {
}
`,
    'MutualFundHoldingRepository.java': `package com.expense.service.repository;

import com.expense.service.entities.MutualFundHolding;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MutualFundHoldingRepository extends CrudRepository<MutualFundHolding, Long> {
}
`,
    'CryptoHoldingRepository.java': `package com.expense.service.repository;

import com.expense.service.entities.CryptoHolding;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CryptoHoldingRepository extends CrudRepository<CryptoHolding, Long> {
}
`,
    'ManualHoldingRepository.java': `package com.expense.service.repository;

import com.expense.service.entities.ManualHolding;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManualHoldingRepository extends CrudRepository<ManualHolding, Long> {
}
`
};

// Create all files
for (const [filename, content] of Object.entries(files)) {
    const filepath = path.join(repoDir, filename);
    fs.writeFileSync(filepath, content);
    console.log(`Created: ${filepath}`);
}

console.log('\nAll repository interfaces created successfully!');
