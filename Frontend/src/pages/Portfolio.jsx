import { useState } from 'react'
import { Search, ArrowUp, ArrowDown } from 'lucide-react'
import './Portfolio.css'

const holdings = [
  { ticker: 'AAPL', name: 'Apple Inc.', shares: 42, avgCost: 178.32, price: 231.15, sector: 'Technology' },
  { ticker: 'MSFT', name: 'Microsoft Corp.', shares: 18, avgCost: 340.1, price: 428.6, sector: 'Technology' },
  { ticker: 'TSLA', name: 'Tesla Inc.', shares: 25, avgCost: 245.8, price: 219.4, sector: 'Consumer' },
  { ticker: 'NVDA', name: 'NVIDIA Corp.', shares: 30, avgCost: 98.5, price: 142.75, sector: 'Technology' },
  { ticker: 'AMZN', name: 'Amazon.com Inc.', shares: 20, avgCost: 155.2, price: 187.9, sector: 'Consumer' },
  { ticker: 'JPM', name: 'JPMorgan Chase', shares: 15, avgCost: 165.4, price: 210.3, sector: 'Financials' },
  { ticker: 'XOM', name: 'Exxon Mobil', shares: 35, avgCost: 112.6, price: 104.2, sector: 'Energy' },
  { ticker: 'JNJ', name: 'Johnson & Johnson', shares: 22, avgCost: 158.9, price: 162.1, sector: 'Healthcare' },
  
]
const topGainers = [
  { ticker: 'NVDA', name: 'NVIDIA Corp.', change: '+44.92%' },
  { ticker: 'AAPL', name: 'Apple Inc.', change: '+29.63%' },
]

const topLosers = [
  { ticker: 'TSLA', name: 'Tesla Inc.', change: '-10.74%' },
  { ticker: 'XOM', name: 'Exxon Mobil', change: '-7.46%' },
]

const sectorBreakdown = [
  { name: 'Technology', pct: 45.2 },
  { name: 'Consumer', pct: 22.3 },
  { name: 'Financials', pct: 12.4 },
]

export default function Portfolio() {
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState('value')
  const [sortDir, setSortDir] = useState('desc')

  const rows = holdings
    .map((h) => {
      const value = h.shares * h.price
      const costBasis = h.shares * h.avgCost
      const gain = value - costBasis
      const gainPct = (gain / costBasis) * 100
      return { ...h, value, costBasis, gain, gainPct }
    })
    .filter(
      (h) =>
        h.ticker.toLowerCase().includes(query.toLowerCase()) ||
        h.name.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1
      return a[sortKey] > b[sortKey] ? dir : -dir
    })

  const totalValue = rows.reduce((sum, h) => sum + h.value, 0)
  const totalCost = rows.reduce((sum, h) => sum + h.costBasis, 0)
  const totalGain = totalValue - totalCost
  const totalGainPct = (totalGain / totalCost) * 100

  function handleSort(key) {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  return (
    <div>
      <h1 className="page-title animate-slide-down"> Portfolio 📊</h1>
      <p className="page-subtitle animate-slide-down">
        Track your holdings, performance, and asset allocation — all in one place.
      </p>

      <div className="portfolio-summary">
        <div className="card portfolio-summary__item">
          <p className="text-secondary">Total Value</p>
          <h3>${totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h3>
        </div>
        <div className="card portfolio-summary__item">
          <p className="text-secondary">Total Cost Basis</p>
          <h3>${totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h3>
        </div>
        <div className="card portfolio-summary__item">
          <p className="text-secondary">Total Gain/Loss</p>
          <h3 className={totalGain >= 0 ? 'text-green' : 'text-red'}>
            {totalGain >= 0 ? '+' : ''}
            ${totalGain.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </h3>
        </div>
        <div className="card portfolio-summary__item">
          <p className="text-secondary">Return</p>
          <h3 className={totalGainPct >= 0 ? 'text-green' : 'text-red'}>
            {totalGainPct >= 0 ? '+' : ''}
            {totalGainPct.toFixed(2)}%
          </h3>
        </div>
      </div>

      <div className="card portfolio-table-card">
        <div className="portfolio-table-card__header">
          <p className="chart-card__title">Holdings</p>
          <div className="holdings-search">
            <Search size={14} />
            <input
              type="text"
              placeholder="Search holdings..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="holdings-table-wrap">
          <table className="holdings-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('ticker')} className="sortable">Ticker</th>
                <th>Name</th>
                <th onClick={() => handleSort('shares')} className="sortable">Shares</th>
                <th onClick={() => handleSort('avgCost')} className="sortable">Avg Cost</th>
                <th onClick={() => handleSort('price')} className="sortable">Price</th>
                <th onClick={() => handleSort('value')} className="sortable">Value</th>
                <th onClick={() => handleSort('gainPct')} className="sortable">Gain/Loss</th>
                <th>Sector</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((h) => (
                <tr key={h.ticker}>
                  <td className="holdings-table__ticker">{h.ticker}</td>
                  <td className="text-secondary">{h.name}</td>
                  <td>{h.shares}</td>
                  <td>${h.avgCost.toFixed(2)}</td>
                  <td>${h.price.toFixed(2)}</td>
                  <td>${h.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                  <td className={h.gain >= 0 ? 'text-green' : 'text-red'}>
                    <span className="gain-cell">
                      {h.gain >= 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                      {h.gainPct.toFixed(2)}%
                    </span>
                  </td>
                  <td>
                    <span className="sector-tag">{h.sector}</span>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} className="holdings-table__empty text-muted">
                    No holdings match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="portfolio-bottom-grid">
  <div className="card panel-card">
    <p className="chart-card__title">Top Gainers</p>
    {topGainers.map((g) => (
      <div className="mini-row" key={g.ticker}>
        <div className="mini-row__icon">{g.ticker.slice(0, 1)}</div>
        <div className="asset-row__info">
          <p className="asset-row__ticker">{g.ticker}</p>
          <p className="text-muted asset-row__name">{g.name}</p>
        </div>
        <p className="text-green mini-row__change">{g.change}</p>
      </div>
    ))}
  </div>

  <div className="card panel-card">
    <p className="chart-card__title">Top Losers</p>
    {topLosers.map((l) => (
      <div className="mini-row" key={l.ticker}>
        <div className="mini-row__icon">{l.ticker.slice(0, 1)}</div>
        <div className="asset-row__info">
          <p className="asset-row__ticker">{l.ticker}</p>
          <p className="text-muted asset-row__name">{l.name}</p>
        </div>
        <p className="text-red mini-row__change">{l.change}</p>
      </div>
    ))}
  </div>

  <div className="card panel-card">
    <p className="chart-card__title">Sector Breakdown</p>
    {sectorBreakdown.map((s) => (
      <div className="mini-row" key={s.name}>
        <p className="asset-row__ticker">{s.name}</p>
        <div className="sector-bar">
          <div className="sector-bar__fill" style={{ width: `${s.pct}%` }} />
        </div>
        <p className="mini-row__change">{s.pct}%</p>
      </div>
    ))}
  </div>
</div>
    </div>
  )
}