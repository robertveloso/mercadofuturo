export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

// (/^\d+(\.\d{0,2})?$/
export const { format: formatPriceNoCurrency } = new Intl.NumberFormat(
  'pt-BR',
  {
    currency: 'BRL',
  }
);

export const sleep = milliseconds => {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
};
