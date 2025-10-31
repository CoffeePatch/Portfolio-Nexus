package com.expense.service.controller;

import com.expense.service.dto.CryptoHoldingRequestDto;
import com.expense.service.dto.ManualHoldingRequestDto;
import com.expense.service.dto.MutualFundHoldingRequestDto;
import com.expense.service.dto.StockHoldingRequestDto;
import com.expense.service.entities.CryptoHolding;
import com.expense.service.entities.ManualHolding;
import com.expense.service.entities.MutualFundHolding;
import com.expense.service.entities.StockHolding;
import com.expense.service.service.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/portfolio/v1")
public class PortfolioController {

    private final PortfolioService portfolioService;

    @Autowired
    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    // Stock Holding Endpoints
    @PostMapping("/stock")
    public ResponseEntity<StockHolding> addStock(
            @RequestHeader("X-User-Id") String userId,
            @RequestBody StockHoldingRequestDto dto) {
        StockHolding newStock = portfolioService.addStock(dto, userId);
        return new ResponseEntity<>(newStock, HttpStatus.CREATED);
    }

    @GetMapping("/stocks")
    public ResponseEntity<List<StockHolding>> getStocks(
            @RequestHeader("X-User-Id") String userId) {
        List<StockHolding> stocks = portfolioService.getStocksForUser(userId);
        return new ResponseEntity<>(stocks, HttpStatus.OK);
    }

    @DeleteMapping("/stock/{externalId}")
    public ResponseEntity<Void> deleteStock(
            @RequestHeader("X-User-Id") String userId,
            @PathVariable String externalId) {
        portfolioService.deleteStock(externalId, userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Mutual Fund Holding Endpoints
    @PostMapping("/mutual-fund")
    public ResponseEntity<MutualFundHolding> addMutualFund(
            @RequestHeader("X-User-Id") String userId,
            @RequestBody MutualFundHoldingRequestDto dto) {
        MutualFundHolding newMutualFund = portfolioService.addMutualFund(dto, userId);
        return new ResponseEntity<>(newMutualFund, HttpStatus.CREATED);
    }

    @GetMapping("/mutual-funds")
    public ResponseEntity<List<MutualFundHolding>> getMutualFunds(
            @RequestHeader("X-User-Id") String userId) {
        List<MutualFundHolding> mutualFunds = portfolioService.getMutualFundsForUser(userId);
        return new ResponseEntity<>(mutualFunds, HttpStatus.OK);
    }

    @DeleteMapping("/mutual-fund/{externalId}")
    public ResponseEntity<Void> deleteMutualFund(
            @RequestHeader("X-User-Id") String userId,
            @PathVariable String externalId) {
        portfolioService.deleteMutualFund(externalId, userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Crypto Holding Endpoints
    @PostMapping("/crypto")
    public ResponseEntity<CryptoHolding> addCrypto(
            @RequestHeader("X-User-Id") String userId,
            @RequestBody CryptoHoldingRequestDto dto) {
        CryptoHolding newCrypto = portfolioService.addCrypto(dto, userId);
        return new ResponseEntity<>(newCrypto, HttpStatus.CREATED);
    }

    @GetMapping("/cryptos")
    public ResponseEntity<List<CryptoHolding>> getCryptos(
            @RequestHeader("X-User-Id") String userId) {
        List<CryptoHolding> cryptos = portfolioService.getCryptoForUser(userId);
        return new ResponseEntity<>(cryptos, HttpStatus.OK);
    }

    @DeleteMapping("/crypto/{externalId}")
    public ResponseEntity<Void> deleteCrypto(
            @RequestHeader("X-User-Id") String userId,
            @PathVariable String externalId) {
        portfolioService.deleteCrypto(externalId, userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Manual Holding Endpoints
    @PostMapping("/manual")
    public ResponseEntity<ManualHolding> addManualHolding(
            @RequestHeader("X-User-Id") String userId,
            @RequestBody ManualHoldingRequestDto dto) {
        ManualHolding newManualHolding = portfolioService.addManualHolding(dto, userId);
        return new ResponseEntity<>(newManualHolding, HttpStatus.CREATED);
    }

    @GetMapping("/manuals")
    public ResponseEntity<List<ManualHolding>> getManualHoldings(
            @RequestHeader("X-User-Id") String userId) {
        List<ManualHolding> manualHoldings = portfolioService.getManualHoldingsForUser(userId);
        return new ResponseEntity<>(manualHoldings, HttpStatus.OK);
    }

    @DeleteMapping("/manual/{externalId}")
    public ResponseEntity<Void> deleteManualHolding(
            @RequestHeader("X-User-Id") String userId,
            @PathVariable String externalId) {
        portfolioService.deleteManualHolding(externalId, userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
