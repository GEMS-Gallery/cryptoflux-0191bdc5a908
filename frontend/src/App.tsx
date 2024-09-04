import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { KeyboardArrowDown, CameraAlt, Settings } from '@mui/icons-material';
import { CircularProgress, Button, TextField } from '@mui/material';
import { backend } from 'declarations/backend';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const mockChartData = [
  { time: '27', price: 3.65 },
  { time: '28', price: 3.70 },
  { time: '29', price: 3.60 },
  { time: '30', price: 3.55 },
  { time: '31', price: 3.50 },
  { time: 'Sep', price: 3.45 },
];

const CryptoTradingMockup = () => {
  const [orderType, setOrderType] = useState('Market');
  const [chartData, setChartData] = useState(mockChartData);
  const [orderBookData, setOrderBookData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const priceData = await backend.getPriceData();
        const formattedPriceData = priceData.map(([time, price]) => ({
          time: new Date(Number(time) / 1000000).toLocaleDateString(),
          price: Number(price)
        }));
        setChartData(formattedPriceData);

        const orderBook = await backend.getOrderBook();
        setOrderBookData(orderBook.map(([price, qty, total]) => ({ price, qty, total })));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTrade = async (isBuy) => {
    setLoading(true);
    try {
      // In a real app, you'd get these values from form inputs
      const price = 3.5;
      const quantity = 100;
      await backend.placeMockOrder(price, quantity, isBuy);
      // In a real app, you'd update the UI or fetch new data here
    } catch (error) {
      console.error('Error placing order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: { color: '#4B5563' },
        grid: { display: false }
      },
      y: {
        ticks: { color: '#4B5563' },
        grid: { color: '#374151' },
        position: 'right' as const
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1F2937',
        titleColor: '#E5E7EB',
        bodyColor: '#E5E7EB',
        borderColor: '#374151',
        borderWidth: 1
      }
    }
  };

  const chartDataConfig = {
    labels: chartData.map(data => data.time),
    datasets: [
      {
        data: chartData.map(data => data.price),
        borderColor: '#22C55E',
        borderWidth: 1.5,
        pointRadius: 0
      }
    ]
  };

  return (
    <div className="flex flex-col h-screen text-gray-300 bg-gray-900 font-sans">
      <header className="flex justify-between items-center p-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-semibold text-white">Exchange UI (Cursor + v0)</h1>
          <div className="flex items-center space-x-2 text-sm">
            <span>ICPUSD</span>
            <KeyboardArrowDown fontSize="small" />
          </div>
        </div>
        <Button variant="contained" color="primary">Select Wallet</Button>
      </header>
      <main className="flex flex-1 overflow-hidden">
        <div className="flex-1 p-2">
          <div className="mb-2 flex justify-between items-center text-sm">
            <div>
              <div className="flex items-center">
                <span className="text-green-500 mr-1">•</span>
                <span className="font-semibold">ICP / TetherUS : 1h : Binance</span>
                <span className="ml-2">O 3.4507 H 3.4507 L 3.3333 C 3.3362 -0.0045 (-0.34%)</span>
              </div>
            </div>
            <div className="flex space-x-1 items-center">
              <Button variant="outlined" size="small">1m</Button>
              <Button variant="outlined" size="small">30m</Button>
              <Button variant="contained" size="small">1h</Button>
              <CameraAlt fontSize="small" className="ml-2" />
              <Settings fontSize="small" className="ml-2" />
            </div>
          </div>
          <div className="h-96 mb-4">
            <Line options={chartOptions} data={chartDataConfig} />
          </div>
        </div>
        <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
          <div className="p-2 border-b border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-semibold">Order Book</h2>
              <span className="text-xs text-gray-400">Recent Trades</span>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="text-gray-500">
                  <th className="text-left">Price(USDT)</th>
                  <th className="text-right">Qty(ICP)</th>
                  <th className="text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {orderBookData.map((order, index) => (
                  <tr key={index} className={index < 4 ? "text-red-400" : "text-green-400"}>
                    <td>{order.price.toFixed(2)}</td>
                    <td className="text-right">{order.qty.toFixed(2)}</td>
                    <td className="text-right">{order.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-2 flex-1">
            <h2 className="text-sm font-semibold mb-2">Trade</h2>
            <div className="flex mb-2">
              <Button variant="outlined" fullWidth>Cross</Button>
              <Button variant="outlined" fullWidth>10.00x</Button>
            </div>
            <div className="flex mb-2">
              <Button variant="contained" color="primary" fullWidth onClick={() => setOrderType('Limit')}>Limit</Button>
              <Button variant="contained" color="secondary" fullWidth onClick={() => setOrderType('Market')}>Market</Button>
            </div>
            <TextField
              fullWidth
              type="number"
              label="Amount"
              variant="outlined"
              size="small"
              className="mb-2"
            />
            <div className="grid grid-cols-4 gap-1 mb-2">
              <Button variant="outlined" size="small">10%</Button>
              <Button variant="outlined" size="small">25%</Button>
              <Button variant="outlined" size="small">50%</Button>
              <Button variant="outlined" size="small">75%</Button>
            </div>
            <div className="flex justify-between text-xs mb-2">
              <span>Value</span>
              <span>-- / -- USDT</span>
            </div>
            <div className="flex justify-between text-xs mb-2">
              <span>Cost</span>
              <span>-- / -- USDT</span>
            </div>
            <div className="flex space-x-2 mb-2">
              <Button variant="contained" color="success" fullWidth onClick={() => handleTrade(true)}>Buy</Button>
              <Button variant="contained" color="error" fullWidth onClick={() => handleTrade(false)}>Sell</Button>
            </div>
            <div className="text-xs">
              <div className="flex justify-between">
                <span>Initial Margin</span>
                <span className="text-green-400">25.00%</span>
              </div>
              <div className="flex justify-between">
                <span>Maintenance Margin</span>
                <span className="text-green-400">25.00%</span>
              </div>
              <div className="flex justify-between">
                <span>Margin Balance</span>
                <span>1,030.4007 USDT</span>
              </div>
              <div className="flex justify-between">
                <span>Available Balance</span>
                <span>1,030.4007 USDT</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CryptoTradingMockup;
