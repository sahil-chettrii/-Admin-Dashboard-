import { useState } from 'react'
import { Search, Plus, X, ArrowUp, ArrowDown, Bell } from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area } from 'recharts'
import './Watchlist.css'

const spark = (up) =>
  up
    ? [{ v: 3 }, { v: 5 }, { v: 4 }, { v: 7 }, { v: 6 }, { v: 9 }, { v: 11 }]
    : [{ v: 10 }, { v: 8 }, { v: 9 }, { v: 6 }, { v: 7 }, { v: 5 }, { v: 3 }]

const initialWatchlist = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 231.15, change: 4.62, alert: 235 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 219.4, change: -3.15, alert: null },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 142.75, change: 5.87, alert: 150 },
  { symbol: 'BTC', name: 'Bitcoin', price: 59876.21, change: -0.41, alert: 62000 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 187.9, change: 1.8, alert: null },
]

export default function Watchlist() {
  const [list, setList] = useState(initialWatchlist)
  const [query, setQuery] = useState('')
  const [newSymbol, setNewSymbol] = useState('')

  const filtered = list.filter(
    (w) =>
      w.symbol.toLowerCase().includes(query.toLowerCase()) ||
      w.name.toLowerCase().includes(query.toLowerCase())
  )

  function handleAdd(e) {
    e.preventDefault()
    const symbol = newSymbol.trim().toUpperCase()
    if (!symbol) return
    if (list.some((w) => w.symbol === symbol)) {
      setNewSymbol('')
      return
    }
    setList([
      ...list,
      {
        symbol,
        name: `${symbol} (custom)`,
        price: 0,
        change: 0,
        alert: null,
      },
    ])
    setNewSymbol('')
  }

  function handleRemove(symbol) {
    setList(list.filter((w) => w.symbol !== symbol))
  }

  return (
    <div>
      <h1 className="page-title animate-slide-down">Watchlist</h1>
      <p className="page-subtitle animate-slide-down">
        Keep an eye on the symbols that matter to you.
      </p>

      <div className="watchlist-toolbar">
        <div className="holdings-search watchlist-search">
          <Search size={14} />
          <input
            type="text"
            placeholder="Search watchlist..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <form className="watchlist-add" onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Add symbol (e.g. AAPL)"
            value={newSymbol}
            onChange={(e) => setNewSymbol(e.target.value)}
          />
          <button type="submit">
            <Plus size={14} /> Add
          </button>
        </form>
      </div>

      <div className="card watchlist-table-card">
        <table className="holdings-table watchlist-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Name</th>
              <th>Price</th>
              <th>Change</th>
              <th>Trend</th>
              <th>Alert</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((w) => {
              const up = w.change >= 0
              return (
                <tr key={w.symbol}>
                  <td className="holdings-table__ticker">{w.symbol}</td>
                  <td className="text-secondary">{w.name}</td>
                  <td>{w.price > 0 ? `$${w.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : '—'}</td>
                  <td className={up ? 'text-green' : 'text-red'}>
                    {w.price > 0 && (
                      <span className="gain-cell">
                        {up ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                        {Math.abs(w.change).toFixed(2)}%
                      </span>
                    )}
                  </td>
                  <td>
                    {w.price > 0 && (
                      <div className="watchlist-table__spark">
                        <ResponsiveContainer width="100%" height={28}>
                          <AreaChart data={spark(up)}>
                            <Area
                              type="monotone"
                              dataKey="v"
                              stroke={up ? '#5ec98f' : '#e26a6a'}
                              strokeWidth={1.5}
                              fill="none"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </td>
                  <td>
                    {w.alert ? (
                      <span className="alert-pill">
                        <Bell size={11} /> ${w.alert.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td>
                    <button className="watchlist-remove-btn" onClick={() => handleRemove(w.symbol)}>
                      <X size={14} />
                    </button>
                  </td>
                </tr>
              )
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="holdings-table__empty text-muted">
                  No symbols in your watchlist yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}