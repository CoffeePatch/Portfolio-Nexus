import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addStockHolding,
  addMutualFundHolding,
  addCryptoHolding,
  addManualHolding,
} from "../api/portfolioService";
import type {
  StockHoldingRequestDto,
  MutualFundHoldingRequestDto,
  CryptoHoldingRequestDto,
  ManualHoldingRequestDto,
} from "../api/portfolioService";

export const useAddStockHolding = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: StockHoldingRequestDto) => addStockHolding(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["holdings"] });
      queryClient.invalidateQueries({ queryKey: ["portfolioHistory"] });
    },
  });
};

export const useAddMutualFundHolding = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: MutualFundHoldingRequestDto) => addMutualFundHolding(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["holdings"] });
      queryClient.invalidateQueries({ queryKey: ["portfolioHistory"] });
    },
  });
};

export const useAddCryptoHolding = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CryptoHoldingRequestDto) => addCryptoHolding(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["holdings"] });
      queryClient.invalidateQueries({ queryKey: ["portfolioHistory"] });
    },
  });
};

export const useAddManualHolding = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: ManualHoldingRequestDto) => addManualHolding(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["holdings"] });
      queryClient.invalidateQueries({ queryKey: ["portfolioHistory"] });
    },
  });
};
