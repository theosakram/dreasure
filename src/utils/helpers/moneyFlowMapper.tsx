export const moneyFlowMapper = (
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

  return {
    totalDeposit,
    totalWithdraw,
    netFlow: totalDeposit - totalWithdraw,
    balance,
  };
};
