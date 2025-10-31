package com.expense.service.entities;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;
@Entity
@Table(name = "manual_holdings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ManualHolding {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, updatable = false, unique = true)
    private String externalId;
    @Column(nullable = false, updatable = false)
    private String userId;
    @Column(nullable = false)
    private String assetName; // e.g., "HDFC Fixed Deposit"
    @Column(nullable = false)
    private String assetType; // e.g., "FD", "Real Estate", "Gold"
    @Column(nullable = false, precision = 19, scale = 4)
    private BigDecimal investedValue;
    @Column(precision = 19, scale = 4)
    private BigDecimal currentValue; // User will update this manually
    @Temporal(TemporalType.DATE)
    private Date purchaseDate;
    @Temporal(TemporalType.DATE)
    private Date maturityDate; // Optional
    @CreationTimestamp
    @Column(updatable = false)
    private Instant createdAt;
    @UpdateTimestamp
    private Instant updatedAt;
    @PrePersist
    protected void onCreate() {
        if (this.externalId == null) {
            this.externalId = UUID.randomUUID().toString();
        }
    }
}