const toNumber = (value: String, fallback: Number) => {
	const n: Number = Number(value);
	return Number.isFinite(n) ? n : fallback;
};

export const API_URL = import.meta.env.API_URL || 'http://localhost';

export const API_PORT = toNumber(import.meta.env.API_PORT, 3000);
