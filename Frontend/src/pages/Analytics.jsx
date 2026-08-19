import { useState } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts'
import { Target, TrendingUp, Percent, Activity } from 'lucide-react'
import './Analytics.css'

const performanceData = [
  { month: 'Mar', portfolio: 4.2, sp500: 2.1 },
  { month: 'Apr', portfolio: 2.8, sp500: 1.5 },
  { month: 'May', portfolio: 6.1, sp500: 3.2 },
  { month: 'Jun', portfolio: -1.4, sp500: -0.8 },
  { month: 'Jul', portfolio: 5.3, sp500: 2.9 },
  { month: 'Aug', portfolio: 8.5, sp500: 4.1 },
]

const winLossData = [
  { name: 'Wins', count: 34 },
  { name: 'Losses', count: 14 },
]

const stats = [
  { label: 'Win Rate', value: '70.8%', icon: Target },
  { label: 'Avg. Return', value: '+4.25%', icon: TrendingUp },
  { label: 'Sharpe Ratio', value: '1.84', icon: Activity },
  { label: 'Alpha vs S&P', value: '+3.6%', icon: Percent },
]

function ChartTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="chart-tooltip__label">{label}</p>
        {payload.map((p) => (
          <p key={p.name} className="chart-tooltip__value" style={{ color: p.color }}>
            {p.name}: {p.value}%
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function Analytics() {
  return (
    <div>
      <h1 className="page-title animate-slide-down">Analytics</h1>
      <p className="page-subtitle animate-slide-down">
        Deeper insights into your trading performance.
      </p>

      <div className="analytics-stat-grid">
        {stats.map((s) => (
          <div className="card analytics-stat" key={s.label}>
            <div className="analytics-stat__icon">
              <s.icon size={16} color="var(--accent-blue-light)" />
            </div>
            <div>
              <p className="text-secondary analytics-stat__label">{s.label}</p>
              <h3 className="analytics-stat__value">{s.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="analytics-charts">
        <div className="card">
          <p className="chart-card__title">Portfolio vs. S&P 500</p>
          <p className="text-muted analytics-sub">Monthly return comparison</p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={performanceData} margin={{ top: 16, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="var(--border-color)" vertical={false} />
              <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<ChartTooltip />} />
              <Line type="monotone" dataKey="portfolio" name="Portfolio" stroke="#4d94d6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="sp500" name="S&P 500" stroke="#5c6068" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <div className="analytics-legend">
            <span><i style={{ background: '#4d94d6' }} /> Portfolio</span>
            <span><i style={{ background: '#5c6068' }} /> S&P 500</span>
          </div>
        </div>

        <div className="card">
          <p className="chart-card__title">Win / Loss Trades</p>
          <p className="text-muted analytics-sub">Last 48 closed positions</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={winLossData} margin={{ top: 16, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="var(--border-color)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} fill="#4d94d6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}