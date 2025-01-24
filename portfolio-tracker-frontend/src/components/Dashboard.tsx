import React, { useEffect, useState } from 'react';
import { fetchPortfolioMetrics } from '../services/api';
import { Box, CircularProgress, Grid, Paper, Typography } from '@mui/material';
import {PieChart} from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts';

const Dashboard: React.FC = () => {

    const [metrics, setMetrics] = useState<any>(null);
    const [yearlyData, setYearlyData] = useState<any>(null);
    const [pieData, setPieData] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        document.title = "Dashboard - Portfolio Tracker";
        const fetchMetrics = async () => {
            try {
                const data = await fetchPortfolioMetrics();
                setMetrics(data);
                updateData(data);
            } catch (error) {
                console.error("Error fetching portfolio metrics:", error);
                setLoading(false);
            }
        };
        fetchMetrics();
    }, []);

    function updateData(data: any) {
        setYearlyData(Object.entries(data.yearlyInvestment).map(([year, amount]) => ({
            year: Number(year),
            amount: amount as number,
        })));
        setPieData(Object.entries(data.portfolioDistribution).map(
            ([key, value]) => ({
                label: key,
                value: value as number,
            })
        ));
    }

if (!loading) {
    return(<Box sx={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
              <Typography>Connection error ☹️</Typography>
          </Box>)
  }
  if (metrics===null) {
    return (
        <Box sx={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
            <CircularProgress sx={{marginRight: "1em"}}/>
        </Box>
    )
  }

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Portfolio Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: "1rem", textAlign: "center" }}>
            <Typography variant="h6">Total Invested</Typography>
            <Typography variant="h4">${metrics.totalInvested.toFixed(2)}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: "1rem", textAlign: "center" }}>
            <Typography variant="h6">Rate of Return</Typography>
            <Typography variant="h4">{metrics.rateOfReturn.toFixed(2)}%</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: "1rem", textAlign: "center" }}>
            <Typography variant="h6">Total Investments</Typography>
            <Typography variant="h4">{metrics.totalInvestments}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom textAlign={"center"}>
            Yearly Investment Distribution
          </Typography>
            <Box sx={{display:"flex", alignItems: "center", justifyContent: "center", height: "100%"}}>
          <BarChart
            height={300}
            xAxis={[{ scaleType: "band", data: yearlyData.map((data: { year: any; }) => data.year) }]}
            series={[
              {
                data: yearlyData.map((data: { amount: any; }) => data.amount),
                label: "Investment",
              },
            ]}
            >
          </BarChart></Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom textAlign={"center"}>
            Portfolio Distribution
          </Typography>
        <Box sx={{display:"flex", alignItems: "center", justifyContent: "center", height: "100%"}}>
          <PieChart 
          series={[{arcLabelRadius: '60%', arcLabelMinAngle: 60, arcLabel: (item) => `${item.value.toFixed(2)}%`, data: pieData}]} 
          width={400} height={200}/></Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
