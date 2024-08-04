
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// export interface Stock {
//   id: string;
//   symbol: string;
//   name: string;
//   image: string;
//   current_price: number;
//   market_cap: number;
//   total_volume: number;
// }

// interface StockState {
//   data: Stock[];
// }

// const initialState: StockState = {
//   data: [],
// };

// const stockSlice = createSlice({
//   name: 'stocks',
//   initialState,
//   reducers: {
//     setStocks(state, action: PayloadAction<Stock[]>) {
//       state.data = action.payload;
//     },
//   },
// });

// export const { setStocks } = stockSlice.actions;
// export default stockSlice.reducer;
// stockSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Stock {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
}

export interface HistoricalPrice {
  date: string;
  price: number;
}

interface StockState {
  data: Stock[];
  historicalPrices: { [key: string]: HistoricalPrice[] }; // key as stock id
}

const initialState: StockState = {
  data: [],
  historicalPrices: {},
};

const stockSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    setStocks(state, action: PayloadAction<Stock[]>) {
      state.data = action.payload;
    },
    setHistoricalPrices(state, action: PayloadAction<{ id: string; prices: HistoricalPrice[] }>) {
      const { id, prices } = action.payload;
      state.historicalPrices[id] = prices;
    },
  },
});

export const { setStocks, setHistoricalPrices } = stockSlice.actions;
export default stockSlice.reducer;
