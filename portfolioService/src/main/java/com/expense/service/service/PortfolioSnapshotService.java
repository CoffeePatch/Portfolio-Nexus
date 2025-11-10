package com.expense.service.service;

import com.expense.service.entities.*;
import com.expense.service.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Service
@Slf4j
public class PortfolioSnapshotService {

    private final StockHoldingRepository stockHoldingRepository;
    private final MutualFundHoldingRepository mutualFundHoldingRepository;
    private final CryptoHoldingRepository cryptoHoldingRepository;
    private final ManualHoldingRepository manualHoldingRepository;
    private final PortfolioHistoryRepository portfolioHistoryRepository;
    private final RestTemplate restTemplate;

    @Autowired
    public PortfolioSnapshotService(
            StockHoldingRepository stockHoldingRepository,
            MutualFundHoldingRepository mutualFundHoldingRepository,
            CryptoHoldingRepository cryptoHoldingRepository,
            ManualHoldingRepository manualHoldingRepository,
            PortfolioHistoryRepository portfolioHistoryRepository,
            RestTemplate restTemplate) {
        this.stockHoldingRepository = stockHoldingRepository;
        this.mutualFundHoldingRepository = mutualFundHoldingRepository;
        this.cryptoHoldingRepository = cryptoHoldingRepository;
        this.manualHoldingRepository = manualHoldingRepository;
        this.portfolioHistoryRepository = portfolioHistoryRepository;
        this.restTemplate = restTemplate;
    }

    @Scheduled(cron = "0 0 1 * * ?") // Runs at 1:00 AM every day
    public void takeSnapshots() {
        log.info("Starting daily portfolio snapshot job...");

        // 1. Get all unique User IDs from all holding tables
        Set<String> userIds = new HashSet<>();
        stockHoldingRepository.findAll().forEach(h -> userIds.add(h.getUserId()));
        mutualFundHoldingRepository.findAll().forEach(h -> userIds.add(h.getUserId()));
        cryptoHoldingRepository.findAll().forEach(h -> userIds.add(h.getUserId()));
        manualHoldingRepository.findAll().forEach(h -> userIds.add(h.getUserId()));

        // 2. For each user, calculate their total value
        for (String userId : userIds) {
            try {
                BigDecimal totalValue = calculateTotalValueForUser(userId);

                // 3. Save the snapshot
                PortfolioHistory snapshot = new PortfolioHistory();
                snapshot.setUserId(userId);
                snapshot.setSnapshotDate(LocalDate.now());
                snapshot.setTotalValue(totalValue);
                portfolioHistoryRepository.save(snapshot);

                log.info("Saved snapshot for user: {} with total value: {}", userId, totalValue);
            } catch (Exception e) {
                log.error("Failed to create snapshot for user: {}", userId, e);
            }
        }

        log.info("Portfolio snapshot job complete. Processed {} users.", userIds.size());
    }

    private BigDecimal calculateTotalValueForUser(String userId) {
        BigDecimal totalValue = BigDecimal.ZERO;

        // Get all holdings for this user
        Iterable<StockHolding> stocks = stockHoldingRepository.findByUserId(userId);
        Iterable<CryptoHolding> cryptos = cryptoHoldingRepository.findByUserId(userId);
        Iterable<MutualFundHolding> mutualFunds = mutualFundHoldingRepository.findByUserId(userId);
        Iterable<ManualHolding> manuals = manualHoldingRepository.findByUserId(userId);

        // Calculate stock values
        for (StockHolding stock : stocks) {
            try {
                String url = "http://marketdataservice:8010/price/stock/" + stock.getSymbol();
                Map<String, Object> priceData = restTemplate.getForObject(url, Map.class);
                if (priceData != null && priceData.containsKey("current_price")) {
                    BigDecimal currentPrice = new BigDecimal(priceData.get("current_price").toString());
                    BigDecimal value = stock.getQuantity().multiply(currentPrice);
                    totalValue = totalValue.add(value);
                }
            } catch (Exception e) {
                log.warn("Failed to fetch stock price for {}, using purchase price", stock.getSymbol());
                BigDecimal value = stock.getQuantity().multiply(stock.getPurchasePrice());
                totalValue = totalValue.add(value);
            }
        }

        // Calculate crypto values
        for (CryptoHolding crypto : cryptos) {
            try {
                String url = "http://marketdataservice:8010/price/crypto/" + crypto.getCoinId();
                Map<String, Object> priceData = restTemplate.getForObject(url, Map.class);
                if (priceData != null && priceData.containsKey("current_price")) {
                    BigDecimal currentPrice = new BigDecimal(priceData.get("current_price").toString());
                    BigDecimal value = crypto.getQuantity().multiply(currentPrice);
                    totalValue = totalValue.add(value);
                }
            } catch (Exception e) {
                log.warn("Failed to fetch crypto price for {}, using purchase price", crypto.getCoinId());
                BigDecimal value = crypto.getQuantity().multiply(crypto.getPurchasePrice());
                totalValue = totalValue.add(value);
            }
        }

        // Calculate mutual fund values
        for (MutualFundHolding mf : mutualFunds) {
            try {
                String url = "http://marketdataservice:8010/price/mutualfund/" + mf.getSchemeCode();
                Map<String, Object> priceData = restTemplate.getForObject(url, Map.class);
                if (priceData != null && priceData.containsKey("nav")) {
                    BigDecimal nav = new BigDecimal(priceData.get("nav").toString());
                    BigDecimal value = mf.getQuantity().multiply(nav);
                    totalValue = totalValue.add(value);
                }
            } catch (Exception e) {
                log.warn("Failed to fetch mutual fund price for {}, using purchase price", mf.getSchemeCode());
                BigDecimal value = mf.getQuantity().multiply(mf.getPurchasePrice());
                totalValue = totalValue.add(value);
            }
        }

        // Add manual holding values (these don't need live prices)
        for (ManualHolding manual : manuals) {
            totalValue = totalValue.add(manual.getCurrentValue());
        }

        return totalValue;
    }
}
