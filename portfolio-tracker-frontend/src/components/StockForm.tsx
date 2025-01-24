import React, { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { addStock, fetchStockQuote } from '../services/api';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import useDebounce from '../services/useDebounce';

const StockForm: React.FC = () => {
  const [stockName, setStockName] = useState('');
  const [ticker, setTicker] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [buyPrice, setBuyPrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const debounceTicker = useDebounce(ticker, 500);

  useEffect(() => {
    const updatePrice = async () => {
      if (debounceTicker.length >= 1) {
        try {
          setLoading(true);
          const {price, name} = await fetchStockQuote(debounceTicker);
          setLoading(false);
          if (!isNaN(price)) {
            setCurrentPrice(price);
            setStockName(name);
          }
        } catch (error) {
          console.error("Error fetching stock quote:", error);
          setCurrentPrice(0);
          setStockName("");
        }
      } else {
        setCurrentPrice(0);
        setStockName("");
      }
    }
    updatePrice();
  }, [debounceTicker]);

  useEffect(() => {
      setBuyPrice(parseFloat((currentPrice*quantity).toFixed(2)));
      document.title = "Add Stock - Portfolio Tracker";
  }, [currentPrice, quantity])

  const handleTickerChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newTicker = e.target.value.toUpperCase();
    setTicker(newTicker);
      

  };

  const handleQuantityChange = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newQuantity = Math.max(0, Number(e.target.value)) | 0;
    setQuantity(newQuantity);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (buyPrice > 0) {
      const stockData = { stockName, ticker, quantity, buyPrice, purchaseDate};
      
      try {
          setLoading(true);
          await addStock(stockData);
          setLoading(false);
          throw("Stock added successfully!");
        } catch (error) {
          throw("Error submitting stock. Please try again after some time.");
        }

    }

  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: "600px", margin: "2em auto" }}>
      <Typography variant="h5" gutterBottom>
        Add Stock
        {loading ? 
        <CircularProgress size={20} sx={{marginLeft: "1em"}}/>
         : null}
      </Typography>
      <TextField
        fullWidth
        label="Stock Name"
        name="stockName"
        value={stockName}
        onChange={(e) => setStockName(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Ticker"
        name="ticker"
        value={ticker}
        onChange={(e) => {handleTickerChange(e)}}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Quantity"
        name="quantity"
        type="number"
        value={quantity}
        onChange={(e) => handleQuantityChange(e)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Purchase Date"
        type="date"
        value={purchaseDate}
        onChange={(e) => setPurchaseDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        margin="normal"
        required
      />
      <Typography sx={{margin: "1em 0"}}>Buy Price: ${buyPrice}</Typography>
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={buyPrice === 0}>
        Add Stock
      </Button>
    </Box>
  );
};

export default StockForm;
