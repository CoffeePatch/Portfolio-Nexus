#!/bin/bash

# Test data setup script for Portfolio Nexus
# This script adds sample data to the expenseService

# Wait for services to be ready
echo "Waiting for services to start..."
sleep 10

# Get a test user ID (you'll need to replace this with an actual user ID from your auth service)
USER_ID="test-user-123"

echo "Creating test expense categories..."

# Create Food category
curl -X POST http://localhost:9812/expense/v1/categories \
  -H "Content-Type: application/json" \
  -H "X-User-Id: $USER_ID" \
  -d '{"name": "Food", "parentId": null}'

# Create Transport category
curl -X POST http://localhost:9812/expense/v1/categories \
  -H "Content-Type: application/json" \
  -H "X-User-Id: $USER_ID" \
  -d '{"name": "Transport", "parentId": null}'

# Create Entertainment category
curl -X POST http://localhost:9812/expense/v1/categories \
  -H "Content-Type: application/json" \
  -H "X-User-Id: $USER_ID" \
  -d '{"name": "Entertainment", "parentId": null}'

# Create Shopping category
curl -X POST http://localhost:9812/expense/v1/categories \
  -H "Content-Type: application/json" \
  -H "X-User-Id: $USER_ID" \
  -d '{"name": "Shopping", "parentId": null}'

echo "Creating test expenses..."

# Create sample expenses
curl -X POST http://localhost:9812/expense/v1/expenses \
  -H "Content-Type: application/json" \
  -H "X-User-Id: $USER_ID" \
  -d '{"amount": 12.50, "description": "Starbucks Coffee", "expenseDate": "2025-01-09", "categoryId": 1}'

curl -X POST http://localhost:9812/expense/v1/expenses \
  -H "Content-Type: application/json" \
  -H "X-User-Id: $USER_ID" \
  -d '{"amount": 45.00, "description": "Uber Ride", "expenseDate": "2025-01-09", "categoryId": 2}'

curl -X POST http://localhost:9812/expense/v1/expenses \
  -H "Content-Type: application/json" \
  -H "X-User-Id: $USER_ID" \
  -d '{"amount": 25.99, "description": "Netflix Subscription", "expenseDate": "2025-01-08", "categoryId": 3}'

echo "Test data setup complete!"
