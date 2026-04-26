export const formatRoundedPlus = (num: number) => {
  if (num < 10) return `${num}+`;

  const step = 10 ** Math.floor(Math.log10(num));
  const rounded = Math.floor(num / step) * step;

  return `${rounded}+`;
};
