import React, { useEffect, useState } from 'react';
import { deleteStock, fetchAllStocks } from '../services/api';
import { Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// interface StockListProps {
//   stocks: any[];
//   setStocks: React.Dispatch<React.SetStateAction<any[]>>;
// }
// Define a Stock type based on the expected structure
interface Stock {
  id: number;
  stockName: string;
  ticker: string;
  quantity: number;
  buyPrice: number;
  purchaseDate: Date;
}
const StockList: React.FC = () => {

  // Explicitly type the stocks state as an array of Stock
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    document.title = "My Holdings - Portfolio Tracker";
    const loadData = async () => {
      try {
        const stockData = await fetchAllStocks();
        setStocks(stockData);
      } catch (error) {
        console.error("Error fetching stocks:", error);
        setLoading(false);
      }
    };
    loadData();
  }, []);
  const handleDelete = async (id: number) => {
    await deleteStock(id);
    setStocks((prev) => prev.filter((stock) => stock.id !== id));
  };
  if (!loading) {
    return(<Box sx={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
              <Typography>Connection error ☹️</Typography>
          </Box>)
  }
  if (stocks.length===0) {
      return (
          <Box sx={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
              <CircularProgress sx={{marginRight: "1em"}}/>
          </Box>
      )
    }
  return (
    <Box sx={{margin: "2em 2em"}}>
    <Typography variant="h5" gutterBottom>
    My Holdings
  </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Stock Name</TableCell>
              <TableCell>Ticker</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Buy Price</TableCell>
              <TableCell>Purchase Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stocks.map((stock) => (
              <TableRow key={stock.id}>
                <TableCell>{stock.stockName}</TableCell>
                <TableCell>{stock.ticker}</TableCell>
                <TableCell>{stock.quantity}</TableCell>
                <TableCell>{stock.buyPrice}</TableCell>
                <TableCell>{stock.purchaseDate.toString()}</TableCell>
                <TableCell>
                  <Button color="error" onClick={() => handleDelete(stock.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
  );
};

export default StockList;
