import { Stock,HistoricalPrice  } from '../store/stockSlice';

export const fetchStockData = async (): Promise<Stock[]> => {
  const response = await fetch('http://localhost:8084/dashboard');
  const result = await response.json();
  return result.data;
};
// api.ts
export const fetchHistoricalData = async (id: string): Promise<HistoricalPrice[]> => {
    const response = await fetch(`http://localhost:8084/${id}`);
    // console.log('response---',response)
    const result = await response.json();
    // console.log('result',result)
    return result.prices.map((entry: [string, number]) => ({
      date: new Date(entry[0]).toLocaleDateString(), // Convert date to readable format
      price: entry[1],
    }));
  };
  