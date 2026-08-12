/**
 * Formatadores e Normalizadores Numéricos Brasileiros
 * Rigor matemático: nunca converte null/indefinido em 0 automaticamente.
 */

export const formatCurrency = (value, options = {}) => {
  const { fallback = '⚠️ Não localizado', showSign = false } = options;
  if (value === null || value === undefined || isNaN(Number(value))) {
    return fallback;
  }
  const num = Number(value);
  const formatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(num));

  if (num < 0) return `- ${formatted}`;
  if (showSign && num > 0) return `+ ${formatted}`;
  return formatted;
};

export const formatPercent = (value, options = {}) => {
  const { fallback = '⚠️ Não localizado', showSign = true, decimals = 2 } = options;
  if (value === null || value === undefined || isNaN(Number(value))) {
    return fallback;
  }
  const num = Number(value);
  const formatted = Math.abs(num).toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  if (num < 0) return `-${formatted}%`;
  if (showSign && num > 0) return `+${formatted}%`;
  return `${formatted}%`;
};

export const formatNumber = (value, options = {}) => {
  const { fallback = '⚠️ Não localizado', decimals = 0 } = options;
  if (value === null || value === undefined || isNaN(Number(value))) {
    return fallback;
  }
  return Number(value).toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

export const parseBrazilianNumber = (value) => {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (!value) return null;

  const raw = String(value)
    .replace(/[R$\s%]/g, '')
    .replace(/[^\d,.-]/g, '');

  if (!raw || raw === '-' || raw === ',' || raw === '.') return null;

  let normalized = raw;
  if (raw.includes(',') && raw.includes('.')) {
    normalized = raw.replace(/\./g, '').replace(',', '.');
  } else if (raw.includes(',')) {
    normalized = raw.replace(',', '.');
  } else if (/^-?\d{1,3}(\.\d{3})+$/.test(raw)) {
    normalized = raw.replace(/\./g, '');
  }

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
};

export const formatDateBR = (dateInput) => {
  if (!dateInput) return '⚠️ Data não informada';
  try {
    if (typeof dateInput === 'string' && dateInput.includes('/')) {
      return dateInput;
    }
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return String(dateInput);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return String(dateInput);
  }
};
