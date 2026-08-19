import { useState } from 'react'
import { Search, ArrowUp, ArrowDown } from 'lucide-react'
import './TradeHistory.css'

const sides = ['All', 'Buy', 'Sell']

const trades = [
  { id: 1, ticker: 'AAPL', name: 'Apple Inc.', side: 'Buy', shares: 10, price: 228.4, date: '2026-08-15', time: '10:24 AM' },
  { id: 2, ticker: 'TSLA', name: 'Tesla Inc.', side: 'Buy', shares: 10, price: 220.15, date: '2026-08-15', time: '2:10 PM' },
  { id: 3, ticker: 'MSFT', name: 'Microsoft Corp.', side: 'Sell', shares: 5, price: 415.3, date: '2026-08-15', time: '9:51 AM' },
  { id: 4, ticker: 'NVDA', name: 'NVIDIA Corp.', side: 'Buy', shares: 15, price: 138.2, date: '2026-08-14', time: '11:32 AM' },
  { id: 5, ticker: 'JPM', name: 'JPMorgan Chase', side: 'Sell', shares: 8, price: 208.9, date: '2026-08-13', time: '3:45 PM' },
  { id: 6, ticker: 'AMZN', name: 'Amazon.com Inc.', side: 'Buy', shares: 12, price: 183.5, date: '2026-08-12', time: '10:05 AM' },
  { id: 7, ticker: 'XOM', name: 'Exxon Mobil', side: 'Sell', shares: 20, price: 106.7, date: '2026-08-11', time: '1:18 PM' },
  { id: 8, ticker: 'JNJ', name: 'Johnson & Johnson', side: 'Buy', shares: 6, price: 160.4, date: '2026-08-10', time: '9:20 AM' },
]

export default function TradeHistory() {
  const [query, setQuery] = useState('')
  const [sideFilter, setSideFilter] = useState('All')

  const filtered = trades.filter((t) => {
    const matchesSide = sideFilter === 'All' || t.side === sideFilter
    const matchesQuery =
      t.ticker.toLowerCase().includes(query.toLowerCase()) ||
      t.name.toLowerCase().includes(query.toLowerCase())
    return matchesSide && matchesQuery
  })

  const totalBuys = trades.filter((t) => t.side === 'Buy').length
  const totalSells = trades.filter((t) => t.side === 'Sell').length
  const totalVolume = trades.reduce((sum, t) => sum + t.shares * t.price, 0)

  return (
    <div>
      <h1 className="page-title animate-slide-down">Trade History</h1>
      <p className="page-subtitle animate-slide-down">
        A record of every trade you've executed.
      </p>

      <div className="trade-summary">
        <div className="card trade-summary__item">
          <p className="text-secondary">Total Trades</p>
          <h3>{trades.length}</h3>
        </div>
        <div className="card trade-summary__item">
          <p className="text-secondary">Buys</p>
          <h3 className="text-green">{totalBuys}</h3>
        </div>
        <div className="card trade-summary__item">
          <p className="text-secondary">Sells</p>
          <h3 className="text-red">{totalSells}</h3>
        </div>
        <div className="card trade-summary__item">
          <p className="text-secondary">Total Volume</p>
          <h3>${totalVolume.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h3>
        </div>
      </div>

      <div className="trade-toolbar">
        <div className="category-tabs">
          {sides.map((s) => (
            <button
              key={s}
              className={`category-tab ${sideFilter === s ? 'category-tab--active' : ''}`}
              onClick={() => setSideFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="holdings-search trade-search">
          <Search size={14} />
          <input
            type="text"
            placeholder="Search trades..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="card trade-table-card">
        <table className="holdings-table trade-table">
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Name</th>
              <th>Side</th>
              <th>Shares</th>
              <th>Price</th>
              <th>Total</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id}>
                <td className="holdings-table__ticker">{t.ticker}</td>
                <td className="text-secondary">{t.name}</td>
                <td>
                  <span className={`badge ${t.side === 'Buy' ? 'badge-green' : 'badge-red'}`}>
                    {t.side === 'Buy' ? <ArrowUp size={11} /> : <ArrowDown size={11} />}
                    {t.side}
                  </span>
                </td>
                <td>{t.shares}</td>
                <td>${t.price.toFixed(2)}</td>
                <td>${(t.shares * t.price).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                <td className="text-secondary">{t.date}</td>
                <td className="text-muted">{t.time}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="holdings-table__empty text-muted">
                  No trades match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}