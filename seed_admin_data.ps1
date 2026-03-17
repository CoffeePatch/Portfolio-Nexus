# Portfolio Nexus - Admin User Data Seeder
# Creates admin user and populates all investment data
# Usage: .\seed_admin_data.ps1

$ErrorActionPreference = "Continue"
$userId = "6261c233-5eca-4238-a316-d577596e54c1"
$portfolioBase = "http://localhost:9811"
$expenseBase = "http://localhost:9812"
$headers = @{"X-User-Id" = $userId; "Content-Type" = "application/json"}

Write-Host "=== Portfolio Nexus Admin Data Seeder ===" -ForegroundColor Cyan
Write-Host "Admin userId: $userId"
Write-Host ""

# ---- STOCKS ----
Write-Host "--- Seeding Stock Holdings ---" -ForegroundColor Yellow
$stocks = @(
    '{"symbol":"TATASTEEL","exchange":"NSE","quantity":100,"purchasePrice":110,"purchaseDate":"2026-01-20"}',
    '{"symbol":"INFY","exchange":"NSE","quantity":25,"purchasePrice":1600,"purchaseDate":"2025-08-18"}',
    '{"symbol":"HDFCBANK","exchange":"NSE","quantity":40,"purchasePrice":1550,"purchaseDate":"2025-11-26"}',
    '{"symbol":"ITC","exchange":"NSE","quantity":200,"purchasePrice":430,"purchaseDate":"2025-06-15"}',
    '{"symbol":"TCS","exchange":"NSE","quantity":15,"purchasePrice":3500,"purchaseDate":"2025-09-20"}'
)
foreach ($body in $stocks) {
    try {
        $r = Invoke-RestMethod -Uri "$portfolioBase/portfolio/v1/stock" -Method POST -Body $body -ContentType "application/json" -Headers @{"X-User-Id"=$userId}
        Write-Host "  OK: Stock $($r.symbol)" -ForegroundColor Green
    } catch { Write-Host "  SKIP: $($_.Exception.Message)" -ForegroundColor DarkGray }
}

# ---- CRYPTO ----
Write-Host "--- Seeding Crypto Holdings ---" -ForegroundColor Yellow
$cryptos = @(
    '{"coinId":"bitcoin","symbol":"BTC","quantity":0.045,"purchasePrice":3500000,"purchaseDate":"2025-05-10"}',
    '{"coinId":"ethereum","symbol":"ETH","quantity":1.2,"purchasePrice":180000,"purchaseDate":"2025-11-06"}',
    '{"coinId":"solana","symbol":"SOL","quantity":15,"purchasePrice":4500,"purchaseDate":"2026-01-05"}'
)
foreach ($body in $cryptos) {
    try {
        $r = Invoke-RestMethod -Uri "$portfolioBase/portfolio/v1/crypto" -Method POST -Body $body -ContentType "application/json" -Headers @{"X-User-Id"=$userId}
        Write-Host "  OK: Crypto $($r.symbol)" -ForegroundColor Green
    } catch { Write-Host "  SKIP: $($_.Exception.Message)" -ForegroundColor DarkGray }
}

# ---- MUTUAL FUNDS ----
Write-Host "--- Seeding Mutual Fund Holdings ---" -ForegroundColor Yellow
$mfs = @(
    '{"schemeCode":"120503","quantity":1500.5,"purchasePrice":45.2,"purchaseDate":"2025-03-07"}',
    '{"schemeCode":"122639","quantity":800,"purchasePrice":68.5,"purchaseDate":"2025-09-07"}'
)
foreach ($body in $mfs) {
    try {
        $r = Invoke-RestMethod -Uri "$portfolioBase/portfolio/v1/mutual-fund" -Method POST -Body $body -ContentType "application/json" -Headers @{"X-User-Id"=$userId}
        Write-Host "  OK: MF scheme $($r.schemeCode)" -ForegroundColor Green
    } catch { Write-Host "  SKIP: $($_.Exception.Message)" -ForegroundColor DarkGray }
}

# ---- MANUAL ASSETS (FD, Gold, Real Estate, Bonds) ----
Write-Host "--- Seeding Manual Holdings ---" -ForegroundColor Yellow
$manuals = @(
    '{"assetName":"SBI Fixed Deposit - 5Y","assetType":"FD","investedValue":500000,"currentValue":575000,"purchaseDate":"2024-01-15","maturityDate":"2029-01-15"}',
    '{"assetName":"HDFC FD - 3Y","assetType":"FD","investedValue":300000,"currentValue":336000,"purchaseDate":"2024-06-01","maturityDate":"2027-06-01"}',
    '{"assetName":"ICICI FD - 1Y","assetType":"FD","investedValue":200000,"currentValue":214000,"purchaseDate":"2025-06-15","maturityDate":"2026-06-15"}',
    '{"assetName":"Gold Sovereign Bond 2025","assetType":"Gold","investedValue":150000,"currentValue":178000,"purchaseDate":"2025-02-01","maturityDate":"2033-02-01"}',
    '{"assetName":"Physical Gold - 24K","assetType":"Gold","investedValue":250000,"currentValue":312000,"purchaseDate":"2024-11-10","maturityDate":null}',
    '{"assetName":"Silver Bars - 999","assetType":"Silver","investedValue":80000,"currentValue":92000,"purchaseDate":"2025-03-20","maturityDate":null}',
    '{"assetName":"2BHK Apartment Indiranagar","assetType":"Real Estate","investedValue":7500000,"currentValue":9200000,"purchaseDate":"2023-03-15","maturityDate":null}',
    '{"assetName":"Commercial Plot Whitefield","assetType":"Real Estate","investedValue":3500000,"currentValue":4100000,"purchaseDate":"2024-08-10","maturityDate":null}',
    '{"assetName":"RBI Bond 7.75%","assetType":"Bond","investedValue":100000,"currentValue":115000,"purchaseDate":"2024-04-01","maturityDate":"2031-04-01"}',
    '{"assetName":"NPS Tier-1 Account","assetType":"NPS","investedValue":200000,"currentValue":245000,"purchaseDate":"2023-07-01","maturityDate":"2055-01-01"}'
)
foreach ($body in $manuals) {
    try {
        $r = Invoke-RestMethod -Uri "$portfolioBase/portfolio/v1/manual" -Method POST -Body $body -ContentType "application/json" -Headers @{"X-User-Id"=$userId}
        Write-Host "  OK: $($r.assetName)" -ForegroundColor Green
    } catch { Write-Host "  SKIP: $($_.Exception.Message)" -ForegroundColor DarkGray }
}

# ---- EXPENSE CATEGORIES ----
Write-Host "--- Seeding Expense Categories ---" -ForegroundColor Yellow
$categories = @(
    '{"name":"Food & Dining","parentId":null}',
    '{"name":"Transport","parentId":null}',
    '{"name":"Entertainment","parentId":null}',
    '{"name":"Shopping","parentId":null}',
    '{"name":"Bills & Utilities","parentId":null}',
    '{"name":"Healthcare","parentId":null}',
    '{"name":"Education","parentId":null}',
    '{"name":"Rent & Housing","parentId":null}'
)
$catIds = @{}
$catIndex = 1
foreach ($body in $categories) {
    try {
        $r = Invoke-RestMethod -Uri "$expenseBase/expense/v1/categories" -Method POST -Body $body -ContentType "application/json" -Headers @{"X-User-Id"=$userId}
        $catIds[$r.name] = $r.id
        Write-Host "  OK: Category '$($r.name)' (id=$($r.id))" -ForegroundColor Green
    } catch { 
        Write-Host "  SKIP category: $($_.Exception.Message)" -ForegroundColor DarkGray 
        $catIds[(ConvertFrom-Json $body).name] = $catIndex
    }
    $catIndex++
}

# ---- EXPENSES ----
Write-Host "--- Seeding Expenses ---" -ForegroundColor Yellow
$expenses = @(
    @{amount=450; description="Swiggy Order - Dinner"; expenseDate="2026-03-05"; categoryId=1},
    @{amount=1200; description="Uber Ride - Airport"; expenseDate="2026-03-05"; categoryId=2},
    @{amount=599; description="Netflix Monthly"; expenseDate="2026-03-01"; categoryId=3},
    @{amount=3500; description="Amazon Shopping"; expenseDate="2026-03-03"; categoryId=4},
    @{amount=2800; description="Electricity Bill - March"; expenseDate="2026-03-01"; categoryId=5},
    @{amount=1500; description="Health Checkup"; expenseDate="2026-02-28"; categoryId=6},
    @{amount=15000; description="Online Course - Coursera"; expenseDate="2026-02-25"; categoryId=7},
    @{amount=25000; description="Monthly Rent"; expenseDate="2026-03-01"; categoryId=8},
    @{amount=350; description="Zomato - Lunch"; expenseDate="2026-03-04"; categoryId=1},
    @{amount=800; description="Rapido Ride"; expenseDate="2026-03-04"; categoryId=2},
    @{amount=200; description="Spotify Premium"; expenseDate="2026-03-01"; categoryId=3},
    @{amount=5600; description="Myntra Clothing"; expenseDate="2026-03-02"; categoryId=4},
    @{amount=950; description="Mobile Recharge"; expenseDate="2026-03-01"; categoryId=5},
    @{amount=2200; description="Medicines - Pharmacy"; expenseDate="2026-02-27"; categoryId=6},
    @{amount=750; description="Coffee Shop"; expenseDate="2026-03-06"; categoryId=1},
    @{amount=180; description="Auto Rickshaw"; expenseDate="2026-03-06"; categoryId=2},
    @{amount=1800; description="Gas Bill"; expenseDate="2026-02-15"; categoryId=5},
    @{amount=4500; description="Gym Membership"; expenseDate="2026-02-01"; categoryId=6},
    @{amount=8000; description="Flipkart Electronics"; expenseDate="2026-02-20"; categoryId=4},
    @{amount=320; description="Breakfast - Cafe"; expenseDate="2026-03-06"; categoryId=1}
)
foreach ($e in $expenses) {
    $body = $e | ConvertTo-Json
    try {
        $r = Invoke-RestMethod -Uri "$expenseBase/expense/v1/expenses" -Method POST -Body $body -ContentType "application/json" -Headers @{"X-User-Id"=$userId}
        Write-Host "  OK: $($e.description) - Rs.$($e.amount)" -ForegroundColor Green
    } catch { Write-Host "  SKIP expense: $($_.Exception.Message)" -ForegroundColor DarkGray }
}

Write-Host ""
Write-Host "=== Seeding Complete ===" -ForegroundColor Cyan
Write-Host "Admin credentials: username=admin, password=admin123"
Write-Host "Admin userId: $userId"
Write-Host ""

# Verify data
Write-Host "--- Verification ---" -ForegroundColor Yellow
try {
    $stocks = Invoke-RestMethod -Uri "$portfolioBase/portfolio/v1/stocks" -Headers @{"X-User-Id"=$userId}
    Write-Host "  Stocks: $($stocks.Count) holdings" -ForegroundColor Green
} catch { Write-Host "  Stocks: Error fetching" -ForegroundColor Red }
try {
    $cryptos = Invoke-RestMethod -Uri "$portfolioBase/portfolio/v1/cryptos" -Headers @{"X-User-Id"=$userId}
    Write-Host "  Crypto: $($cryptos.Count) holdings" -ForegroundColor Green
} catch { Write-Host "  Crypto: Error fetching" -ForegroundColor Red }
try {
    $mfs = Invoke-RestMethod -Uri "$portfolioBase/portfolio/v1/mutual-funds" -Headers @{"X-User-Id"=$userId}
    Write-Host "  Mutual Funds: $($mfs.Count) holdings" -ForegroundColor Green
} catch { Write-Host "  Mutual Funds: Error fetching" -ForegroundColor Red }
try {
    $manuals = Invoke-RestMethod -Uri "$portfolioBase/portfolio/v1/manuals" -Headers @{"X-User-Id"=$userId}
    Write-Host "  Manual Assets: $($manuals.Count) holdings" -ForegroundColor Green
} catch { Write-Host "  Manual Assets: Error fetching" -ForegroundColor Red }
try {
    $expenses = Invoke-RestMethod -Uri "$expenseBase/expense/v1/expenses" -Headers @{"X-User-Id"=$userId}
    Write-Host "  Expenses: $($expenses.Count) records" -ForegroundColor Green
} catch { Write-Host "  Expenses: Error fetching" -ForegroundColor Red }
