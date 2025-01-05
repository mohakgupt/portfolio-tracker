import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080/api/stocks";

export const fetchAllStocks = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const fetchStockQuote = async (ticker: string) => {
  const response = await axios.get(`${API_BASE_URL}/quote/${ticker}`);
  return response.data;
};

export const addStock = async (stock: any) => {
  const response = await axios.post(API_BASE_URL, stock);
  return response.data;
};

export const deleteStock = async (id: number) => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};

export const updateStock = async (id: number, updatedStock: any) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, updatedStock);
  return response.data;
};

/**
 * Calculates the total portfolio value by fetching real-time stock prices.
 */
export const calculatePortfolioValue = async (stocks: any[]) => {
  let totalValue = 0;

  for (const stock of stocks) {
    const quote = await fetchStockQuote(stock.ticker);
    const currentPrice = parseFloat(quote['05. price']);
    totalValue += currentPrice * stock.quantity;
  }

  return totalValue;
};

export const fetchPortfolioMetrics = async () => {
    const response = await axios.get('http://localhost:8080/api/stocks/metrics');
    return response.data;
};
