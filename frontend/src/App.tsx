import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { KeyboardArrowDown, CameraAlt, Settings } from '@mui/icons-material';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const mockChartData = [
  { time: '27', price: 3.65 },
  { time: '28', price: 3.70 },
  { time: '29', price: 3.60 },
  { time: '30', price: 3.55 },
  { time: '31', price: 3.50 },
  { time: 'Sep', price: 3.45 },
];

const orderBookData = [
  { price: 3.62, qty: 1000.00, total: 3620.00 },
  { price: 3.61, qty: 1000.00, total: 3610.00 },
  { price: 3.60, qty: 1000.00, total: 3600.00 },
  { price: 3.59, qty: 1000.00, total: 3590.00 },
  { price: 3.58, qty: 1000.00, total: 3580.00 },
  { price: 3.57, qty: 1000.00, total: 3570.00 },
  { price: 3.56, qty: 1000.00, total: 3560.00 },
  { price: 3.55, qty: 1000.00, total: 3550.00 },
];

const CryptoTradingMockup = () => {
  const [orderType, setOrderType] = useState('Market');

  const chartData = {
    labels: mockChartData.map(data => data.time),
    datasets: [
      {
        label: 'Price',
        data: mockChartData.map(data => data.price),
        borderColor: '#22C55E',
        borderWidth: 1.5,
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#4B5563',
        },
      },
      y: {
        position: 'right' as const,
        grid: {
          color: '#374151',
        },
        ticks: {
          color: '#4B5563',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1F2937',
        titleColor: '#E5E7EB',
        bodyColor: '#E5E7EB',
        borderColor: '#374151',
        borderWidth: 1,
      },
    },
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
        <button className="px-4 py-1 bg-indigo-600 text-white text-sm rounded">Select Wallet</button>
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
              <button className="px-2 py-0.5 bg-gray-700 rounded text-xs">1m</button>
              <button className="px-2 py-0.5 bg-gray-700 rounded text-xs">30m</button>
              <button className="px-2 py-0.5 bg-blue-600 rounded text-xs">1h</button>
              <CameraAlt fontSize="small" className="ml-2" />
              <Settings fontSize="small" className="ml-2" />
            </div>
          </div>
          <div className="h-96 mb-4">
            <Line data={chartData} options={chartOptions} />
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
              <button className="flex-1 py-1 px-2 bg-gray-700 text-xs rounded-l">Cross</button>
              <button className="flex-1 py-1 px-2 bg-gray-900 text-xs">10.00x</button>
            </div>
            <div className="flex mb-2">
              <button className="flex-1 py-1 px-2 bg-gray-700 text-xs rounded-l">Limit</button>
              <button className="flex-1 py-1 px-2 bg-yellow-600 text-xs rounded-r">Market</button>
            </div>
            <div className="mb-2">
              <input type="number" className="w-full p-1 bg-gray-700 text-xs rounded" placeholder="0.00" />
            </div>
            <div className="grid grid-cols-4 gap-1 mb-2">
              <button className="p-1 bg-gray-700 text-xs rounded">10%</button>
              <button className="p-1 bg-gray-700 text-xs rounded">25%</button>
              <button className="p-1 bg-gray-700 text-xs rounded">50%</button>
              <button className="p-1 bg-gray-700 text-xs rounded">75%</button>
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
              <button className="flex-1 py-2 bg-green-600 rounded text-sm">Buy</button>
              <button className="flex-1 py-2 bg-red-600 rounded text-sm">Sell</button>
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
