import React, { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { addStock, updateStock, fetchStockQuote } from '../services/api';
import { Box, Button, TextField, Typography } from '@mui/material';

const StockForm: React.FC = () => {
  const [stockName, setStockName] = useState('');
  const [ticker, setTicker] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [buyPrice, setBuyPrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
      setBuyPrice(parseFloat((currentPrice*quantity).toFixed(2)));
      document.title = "Add Stock - Portfolio Tracker";
  }, [currentPrice, quantity])
  
  
  const handleTickerChange = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newTicker = e.target.value.toUpperCase();
    setTicker(newTicker);
    
    if (newTicker.length >= 1) {
      try {
        const {price, name} = await fetchStockQuote(newTicker);
        console.log(price, name)
        if (!isNaN(price)) {
          // console.log(price);
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
  };

  const handleQuantityChange = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newQuantity = Math.max(0, Number(e.target.value)) | 0;
    // console.log(newQuantity)
    setQuantity(newQuantity);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (buyPrice > 0) {
      const stockData = { stockName, ticker, quantity, buyPrice, purchaseDate};
  
      try {
        // if (stock?.id) {
        //   await updateStock(stock.id, stockData);
        // } 
        // else {
          await addStock(stockData);
          throw("Stock added successfully!");
        // }
        // onSubmit();
      } catch (error) {
        throw("Error submitting stock. Please try again after some time.");
        console.error("Error submitting stock:", error);
      }

    }

  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: "600px", margin: "2em auto" }}>
      <Typography variant="h5" gutterBottom>
        Add Stock
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
        onChange={(e) => handleTickerChange(e)}
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
