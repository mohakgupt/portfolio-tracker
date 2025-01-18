import React, {  } from 'react';
import Dashboard from '../components/Dashboard';
import { Route, Routes } from 'react-router';
import StockList from '~/components/StockList';
import StockForm from '~/components/StockForm';



const Home: React.FC = () => {
  const isBrowser = typeof window !== "undefined";
  if (!isBrowser) {
    return null; // or a loading spinner, or a static version of the page
  }
  return (
      <Routes>
          <Route index element={<Dashboard/>} />
          <Route path="stocks" element={<StockList/>} />
          <Route path="add-stock" element={<StockForm />} />
      </Routes>
  );
};

export default Home;
