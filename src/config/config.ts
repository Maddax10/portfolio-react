const toNumber = (value: String, fallback: Number) => {
  const n: Number = Number(value);
  return Number.isFinite(n) ? (n === 0 ? '' : n) : fallback;
};

export const API_URL = import.meta.env.VITE_API_URL;
export const API_BASE_POINT = import.meta.env.VITE_API_BASE_POINT;

export const API_PORT = toNumber(import.meta.env.VITE_API_PORT, 443);
