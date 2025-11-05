package com.expense.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AggregatedAssetDto {
    private String externalId;
    private String type;
    private String name;
    private BigDecimal quantity;
    private BigDecimal totalInvested;
    private BigDecimal currentPrice;
    private BigDecimal currentValue;
    private BigDecimal pnl;
}
