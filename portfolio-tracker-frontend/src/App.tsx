import './App.css'
import { AppBar, Box, Button, Container, createTheme, ThemeProvider, Toolbar, Typography } from '@mui/material'
import { Link, Route, Routes } from 'react-router'
import Dashboard from './components/Dashboard';
import StockForm from './components/StockForm';
import StockList from './components/StockList';

function App() {
  const theme = createTheme({
      colorSchemes: {
        dark: true,
      },
    });

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Portfolio Tracker</Typography>
          <Box sx={{marginLeft: "auto"}}>
            <Link to="/">
              <Button color="inherit">
                Dashboard
              </Button>
            </Link>          
            <Link to="/stocks">
              <Button color="inherit">
                Stock List
              </Button>
            </Link>          
            <Link to="/add-stock">
              <Button color="inherit">
                Add Stock
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
        <Routes>
            <Route index element={<Dashboard/>} />
            <Route path="stocks" element={<StockList/>} />
            <Route path="add-stock" element={<StockForm />} />
        </Routes>
      </Container>
    </ThemeProvider>
  )
}

export default App
