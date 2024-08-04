'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStocks, setHistoricalPrices } from '../store/stockSlice';
import { RootState, AppDispatch } from '../store/store';
import { fetchStockData, fetchHistoricalData } from '../lib/api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, Box, AppBar, Toolbar, Typography, Container, CssBaseline } from '@mui/material';

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const stocks = useSelector((state: RootState) => state.stocks.data);
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [prices, setPrices] = useState<{ date: string; price: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStockData();
      dispatch(setStocks(data));
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (selectedStock) {
      const fetchPrices = async () => {
        const data = await fetchHistoricalData(selectedStock);
        dispatch(setHistoricalPrices({ id: selectedStock, prices: data }));
        setPrices(data.slice(-20)); 
      };
      fetchPrices();
    }
  }, [selectedStock, dispatch]);

  const handleOpen = (id: string) => {
    setSelectedStock(id);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <div>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">CryptoTracker</Typography>
        </Toolbar>
      </AppBar>

      <Container>
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
            <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Coin</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>24h Volume</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Market Cap</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stocks.map((stock, index) => (
                <TableRow key={stock.id}>
                  <TableCell sx={{ fontWeight: 'bold' }}>{index + 1}</TableCell>
                  <TableCell>
                    <img src={stock.image} alt={stock.name} width={20} height={20} style={{ marginRight: 10 }} />
                    {stock.name} ({stock.symbol.toUpperCase()})
                  </TableCell>
                  <TableCell>${stock.current_price.toLocaleString()}</TableCell>
                  <TableCell>${stock.total_volume.toLocaleString()}</TableCell>
                  <TableCell>${stock.market_cap.toLocaleString()}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleOpen(stock.id)}>View Historical Data</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal open={open} onClose={handleClose}>
          <Box 
            sx={{ 
              p: 4, 
              bgcolor: 'background.paper', 
              width: '80%', 
              margin: 'auto', 
              marginTop: '5%',
              maxHeight: '80vh', 
              overflowY: 'auto' 
            }}
          >
            <h2>Historical Data for {selectedStock}</h2>
            <TableContainer component={Paper} sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {prices.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell>${entry.price.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Modal>
      </Container>

      <footer style={{ marginTop: '20px', padding: '10px', textAlign: 'center', background: '#f5f5f5' }}>
        <Typography variant="body2">© 2024 CryptoTracker. All rights reserved.</Typography>
      </footer>
    </div>
  );
};

export default Page;
