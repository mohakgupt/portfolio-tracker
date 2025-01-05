import { AppBar, Toolbar, Typography, Container, ThemeProvider, createTheme, Box, Button } from "@mui/material";
import { Link, Outlet } from "react-router";
const theme = createTheme({
    colorSchemes: {
      dark: true,
    },
  });
const Layout: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Portfolio Tracker</Typography>
          {/* <Typography variant="h6" sx={{marginLeft: "auto"}}>Portfolio Tracker</Typography> */}
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
        <Outlet/>
      </Container>
    </ThemeProvider>
  );
};

export default Layout;
