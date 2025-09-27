// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const filterEmptyObjectKeys = <T extends Record<string, any>>(
  obj: T,
): Record<string, string> => {
  return Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(obj).filter(([_, value]) => value !== "" && value != null),
  );
};
