package com.expense.service.service;

import com.expense.service.dto.CryptoHoldingRequestDto;
import com.expense.service.dto.ManualHoldingRequestDto;
import com.expense.service.dto.MutualFundHoldingRequestDto;
import com.expense.service.dto.StockHoldingRequestDto;
import com.expense.service.entities.CryptoHolding;
import com.expense.service.entities.ManualHolding;
import com.expense.service.entities.MutualFundHolding;
import com.expense.service.entities.StockHolding;
import com.expense.service.repository.CryptoHoldingRepository;
import com.expense.service.repository.ManualHoldingRepository;
import com.expense.service.repository.MutualFundHoldingRepository;
import com.expense.service.repository.StockHoldingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PortfolioService {

    private final StockHoldingRepository stockHoldingRepository;
    private final MutualFundHoldingRepository mutualFundHoldingRepository;
    private final CryptoHoldingRepository cryptoHoldingRepository;
    private final ManualHoldingRepository manualHoldingRepository;

    @Autowired
    public PortfolioService(StockHoldingRepository stockHoldingRepository,
                           MutualFundHoldingRepository mutualFundHoldingRepository,
                           CryptoHoldingRepository cryptoHoldingRepository,
                           ManualHoldingRepository manualHoldingRepository) {
        this.stockHoldingRepository = stockHoldingRepository;
        this.mutualFundHoldingRepository = mutualFundHoldingRepository;
        this.cryptoHoldingRepository = cryptoHoldingRepository;
        this.manualHoldingRepository = manualHoldingRepository;
    }

    // Stock Holding Methods
    public StockHolding addStock(StockHoldingRequestDto dto, String userId) {
        StockHolding newStock = new StockHolding();
        newStock.setUserId(userId);
        newStock.setSymbol(dto.getSymbol());
        newStock.setExchange(dto.getExchange());
        newStock.setQuantity(dto.getQuantity());
        newStock.setPurchasePrice(dto.getPurchasePrice());
        newStock.setPurchaseDate(dto.getPurchaseDate());
        return stockHoldingRepository.save(newStock);
    }

    public List<StockHolding> getStocksForUser(String userId) {
        return stockHoldingRepository.findByUserId(userId);
    }

    public void deleteStock(String externalId, String userId) {
        List<StockHolding> holdings = stockHoldingRepository.findByUserId(userId);
        holdings.stream()
                .filter(h -> h.getExternalId().equals(externalId))
                .findFirst()
                .ifPresent(stockHoldingRepository::delete);
    }

    // Mutual Fund Holding Methods
    public MutualFundHolding addMutualFund(MutualFundHoldingRequestDto dto, String userId) {
        MutualFundHolding newMutualFund = new MutualFundHolding();
        newMutualFund.setUserId(userId);
        newMutualFund.setSchemeCode(dto.getSchemeCode());
        newMutualFund.setQuantity(dto.getQuantity());
        newMutualFund.setPurchasePrice(dto.getPurchasePrice());
        newMutualFund.setPurchaseDate(dto.getPurchaseDate());
        return mutualFundHoldingRepository.save(newMutualFund);
    }

    public List<MutualFundHolding> getMutualFundsForUser(String userId) {
        return mutualFundHoldingRepository.findByUserId(userId);
    }

    public void deleteMutualFund(String externalId, String userId) {
        List<MutualFundHolding> holdings = mutualFundHoldingRepository.findByUserId(userId);
        holdings.stream()
                .filter(h -> h.getExternalId().equals(externalId))
                .findFirst()
                .ifPresent(mutualFundHoldingRepository::delete);
    }

    // Crypto Holding Methods
    public CryptoHolding addCrypto(CryptoHoldingRequestDto dto, String userId) {
        CryptoHolding newCrypto = new CryptoHolding();
        newCrypto.setUserId(userId);
        newCrypto.setCoinId(dto.getCoinId());
        newCrypto.setSymbol(dto.getSymbol());
        newCrypto.setQuantity(dto.getQuantity());
        newCrypto.setPurchasePrice(dto.getPurchasePrice());
        newCrypto.setPurchaseDate(dto.getPurchaseDate());
        return cryptoHoldingRepository.save(newCrypto);
    }

    public List<CryptoHolding> getCryptoForUser(String userId) {
        return cryptoHoldingRepository.findByUserId(userId);
    }

    public void deleteCrypto(String externalId, String userId) {
        List<CryptoHolding> holdings = cryptoHoldingRepository.findByUserId(userId);
        holdings.stream()
                .filter(h -> h.getExternalId().equals(externalId))
                .findFirst()
                .ifPresent(cryptoHoldingRepository::delete);
    }

    // Manual Holding Methods
    public ManualHolding addManualHolding(ManualHoldingRequestDto dto, String userId) {
        ManualHolding newManualHolding = new ManualHolding();
        newManualHolding.setUserId(userId);
        newManualHolding.setAssetName(dto.getAssetName());
        newManualHolding.setAssetType(dto.getAssetType());
        newManualHolding.setInvestedValue(dto.getInvestedValue());
        newManualHolding.setCurrentValue(dto.getCurrentValue());
        newManualHolding.setPurchaseDate(dto.getPurchaseDate());
        newManualHolding.setMaturityDate(dto.getMaturityDate());
        return manualHoldingRepository.save(newManualHolding);
    }

    public List<ManualHolding> getManualHoldingsForUser(String userId) {
        return manualHoldingRepository.findByUserId(userId);
    }

    public void deleteManualHolding(String externalId, String userId) {
        List<ManualHolding> holdings = manualHoldingRepository.findByUserId(userId);
        holdings.stream()
                .filter(h -> h.getExternalId().equals(externalId))
                .findFirst()
                .ifPresent(manualHoldingRepository::delete);
    }
}
