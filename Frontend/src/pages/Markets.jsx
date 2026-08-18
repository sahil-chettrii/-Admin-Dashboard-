import { useState } from 'react'
import { Search, ArrowUp, ArrowDown } from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area } from 'recharts'
import './Markets.css'

const spark = (up) =>
  up
    ? [{ v: 3 }, { v: 5 }, { v: 4 }, { v: 7 }, { v: 6 }, { v: 9 }, { v: 11 }]
    : [{ v: 10 }, { v: 8 }, { v: 9 }, { v: 6 }, { v: 7 }, { v: 5 }, { v: 3 }]

const categories = ['All', 'Stocks', 'Crypto', 'Indices', 'Forex']

const marketData = [
  { symbol: 'AAPL', name: 'Apple Inc.', category: 'Stocks', price: 231.15, change: 4.62, volume: '52.3M' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', category: 'Stocks', price: 428.6, change: 2.31, volume: '24.1M' },
  { symbol: 'TSLA', name: 'Tesla Inc.', category: 'Stocks', price: 219.4, change: -3.15, volume: '88.7M' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', category: 'Stocks', price: 142.75, change: 5.87, volume: '145.2M' },
  { symbol: 'BTC', name: 'Bitcoin', category: 'Crypto', price: 59876.21, change: -0.41, volume: '$28.4B' },
  { symbol: 'ETH', name: 'Ethereum', category: 'Crypto', price: 2652.11, change: 0.21, volume: '$12.1B' },
  { symbol: 'SOL', name: 'Solana', category: 'Crypto', price: 178.34, change: 6.42, volume: '$3.2B' },
  { symbol: 'SPX', name: 'S&P 500', category: 'Indices', price: 5344.2, change: 0.84, volume: '—' },
  { symbol: 'IXIC', name: 'NASDAQ Composite', category: 'Indices', price: 17832.6, change: 1.21, volume: '—' },
  { symbol: 'DJI', name: 'Dow Jones', category: 'Indices', price: 37394.76, change: 0.38, volume: '—' },
  { symbol: 'EUR/USD', name: 'Euro / US Dollar', category: 'Forex', price: 1.0842, change: -0.12, volume: '—' },
  { symbol: 'GBP/USD', name: 'British Pound / US Dollar', category: 'Forex', price: 1.2715, change: 0.18, volume: '—' },
]