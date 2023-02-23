export const formatNumber = (n = 0) => {
  if (n > 9999 && n < 1e6 - 50) {
    return (n / 1e3).toFixed(1) + 'K';
  }
  if (n >= 1e6 - 50 && n < 1e9 - 5e4) {
    return (n / 1e6).toFixed(1) + 'M';
  }
  if (n >= 1e9 - (5e4 + 1) && n < 1e12 - 5e7) {
    return (n / 1e9).toFixed(1) + 'B';
  }
  if (n >= 1e12 - 5e7) {
    return (n / 1e12).toFixed(1) + 'T';
  }
  return n;
};
