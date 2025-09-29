export const getPageRange = (page: number, pageSize: number = 10) => {
  if (page < 1) throw new Error("Page number must be 1 or higher");

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  return { from, to };
};
