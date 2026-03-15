// Currency formatting utilities

export const formatCurrency = (amount, currency = 'INR', locale = 'en-IN') => {
  if (!amount && amount !== 0) return 'N/A';
  
  try {
    if (currency === 'INR') {
      // Format Indian Rupees with proper lakhs/crores notation
      if (amount >= 10000000) { // 1 crore
        return `₹${(amount / 10000000).toFixed(1)}Cr`;
      } else if (amount >= 100000) { // 1 lakh
        return `₹${(amount / 100000).toFixed(1)}L`;
      } else if (amount >= 1000) { // 1 thousand
        return `₹${(amount / 1000).toFixed(0)}K`;
      } else {
        return `₹${amount.toLocaleString('en-IN')}`;
      }
    } else {
      // Format other currencies normally
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    }
  } catch (error) {
    console.error('Currency formatting error:', error);
    return `${currency} ${amount}`;
  }
};

export const formatCurrencyDetailed = (amount, currency = 'INR', locale = 'en-IN') => {
  if (!amount && amount !== 0) return 'N/A';
  
  try {
    if (currency === 'INR') {
      return `₹${amount.toLocaleString('en-IN')}`;
    } else {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    }
  } catch (error) {
    console.error('Currency formatting error:', error);
    return `${currency} ${amount}`;
  }
};

export const formatNumber = (num) => {
  if (!num && num !== 0) return 'N/A';
  
  try {
    return new Intl.NumberFormat('en-IN').format(num);
  } catch (error) {
    console.error('Number formatting error:', error);
    return num.toString();
  }
};

export const convertCurrency = (amount, fromCurrency, toCurrency) => {
  // Simple conversion rates (in a real app, you'd use a currency API)
  const rates = {
    'INR': 1,
    'USD': 0.012, // 1 INR = 0.012 USD
    'EUR': 0.011,
    'GBP': 0.0095,
    'CAD': 0.016,
    'AUD': 0.018,
    'SGD': 0.016,
  };
  
  if (!rates[fromCurrency] || !rates[toCurrency]) {
    return amount;
  }
  
  // Convert to INR first, then to target currency
  const inrAmount = amount / rates[fromCurrency];
  return inrAmount * rates[toCurrency];
};