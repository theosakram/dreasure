import { useMemo } from "react";

export const useFinancialPercentages = (
  transactions: Array<{ amount: number; type: "deposit" | "withdraw" }>,
) => {
  const totalDeposit = transactions
    .filter((t) => t.type === "deposit")
    .reduce((acc, t) => acc + (t.amount || 0), 0);

  const totalWithdraw = transactions
    .filter((t) => t.type === "withdraw")
    .reduce((acc, t) => acc + (t.amount || 0), 0);

  const balance =
    transactions.reduce((acc, t) => {
      if (t.type === "deposit") return acc + (t.amount || 0);
      if (t.type === "withdraw") return acc - (t.amount || 0);
      return acc;
    }, 0) || 0;

  const netFlow = totalDeposit - totalWithdraw;

  const netFlowPercentage = useMemo(() => {
    if (totalDeposit === 0) return 0;
    return (netFlow / totalDeposit) * 100;
  }, [netFlow, totalDeposit]);

  const balanceProgress = useMemo(() => {
    if (totalDeposit === 0) return 0;
    return Math.min((balance / totalDeposit) * 100, 100);
  }, [balance, totalDeposit]);

  const withdrawProgress = useMemo(() => {
    if (totalDeposit === 0) return 0;
    return Math.min((totalWithdraw / totalDeposit) * 100, 100);
  }, [totalWithdraw, totalDeposit]);

  return {
    balance,
    totalDeposit,
    totalWithdraw,
    netFlow,
    netFlowPercentage,
    balanceProgress,
    withdrawProgress,
  };
};
