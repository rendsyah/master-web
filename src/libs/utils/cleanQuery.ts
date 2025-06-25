export const cleanQuery = (
  obj: Record<string, unknown>,
  removeEmptyString = true,
): Record<string, string> => {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([, value]) => {
        if (value === undefined || value === null) return false;
        if (removeEmptyString && value === '') return false;
        return true;
      })
      .map(([key, value]) => [key, String(value)]),
  );
};
