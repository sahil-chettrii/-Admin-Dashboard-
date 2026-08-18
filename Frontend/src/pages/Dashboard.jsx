import { useState } from 'react'
import {
  DollarSign,
  TrendingUp,
  BarChart2,
  Layers,
  PieChart as PieIcon,
  ChevronRight,
} from 'lucide-react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import StatCard from '../components/StatCard/StatCard'
import './Dashboard.css'

const chartDataByRange = {
  '1D': [
    { date: '9:30', value: 268500 },
    { date: '11:00', value: 269200 },
    { date: '12:30', value: 268800 },
    { date: '2:00', value: 270100 },
    { date: '3:30', value: 270900 },
    { date: '4:00', value: 271243 },
  ],
  '1W': [
    { date: 'Mon', value: 264000 },
    { date: 'Tue', value: 266500 },
    { date: 'Wed', value: 265800 },
    { date: 'Thu', value: 268200 },
    { date: 'Fri', value: 271243 },
  ],
  '1M': [
    { date: 'Jul 14', value: 250000 },
    { date: 'Jul 18', value: 253000 },
    { date: 'Jul 22', value: 249000 },
    { date: 'Jul 26', value: 251000 },
    { date: 'Jul 30', value: 255000 },
    { date: 'Aug 3', value: 260000 },
    { date: 'Aug 7', value: 265000 },
    { date: 'Aug 11', value: 271243 },
  ],
  '1Y': [
    { date: 'Sep', value: 210000 },
    { date: 'Nov', value: 225000 },
    { date: 'Jan', value: 232000 },
    { date: 'Mar', value: 241000 },
    { date: 'May', value: 255000 },
    { date: 'Jul', value: 263000 },
    { date: 'Aug', value: 271243 },
  ],
  ALL: [
    { date: '2023', value: 150000 },
    { date: '2024', value: 190000 },
    { date: '2025', value: 235000 },
    { date: '2026', value: 271243 },
  ],
}

const allocationData = [
  { name: 'Technology', value: 38.4, color: 'var(--chart-1)' },
  { name: 'Healthcare', value: 18.2, color: 'var(--chart-2)' },
  { name: 'Financials', value: 15.6, color: 'var(--chart-3)' },
  { name: 'Consumer', value: 14.1, color: 'var(--chart-4)' },
  { name: 'Energy', value: 8.7, color: 'var(--chart-5)' },
  { name: 'Other', value: 5, color: 'var(--chart-6)' },
]

const sectorDetails = {
  Technology: { amount: '$104,157', holdings: 'AAPL, MSFT, NVDA' },
  Healthcare: { amount: '$49,366', holdings: 'JNJ, PFE, UNH' },
  Financials: { amount: '$42,314', holdings: 'JPM, GS, BAC' },
  Consumer: { amount: '$38,245', holdings: 'AMZN, TSLA, NKE' },
  Energy: { amount: '$23,598', holdings: 'XOM, CVX' },
  Other: { amount: '$13,562', holdings: 'Misc.' },
}

const ranges = ['1D', '1W', '1M', '1Y', 'ALL']

const sparkUp = [{ v: 4 }, { v: 6 }, { v: 5 }, { v: 8 }, { v: 7 }, { v: 10 }, { v: 12 }]
const sparkUp2 = [{ v: 3 }, { v: 5 }, { v: 4 }, { v: 6 }, { v: 9 }, { v: 8 }, { v: 11 }]
const sparkUp3 = [{ v: 2 }, { v: 4 }, { v: 6 }, { v: 5 }, { v: 7 }, { v: 9 }, { v: 10 }]
const sparkDown = [{ v: 10 }, { v: 9 }, { v: 11 }, { v: 8 }, { v: 6 }, { v: 7 }, { v: 4 }]

const topAssets = [
  { ticker: 'AAPL', name: 'Apple Inc.', price: '$182.91', change: '+4.62%', trend: sparkUp },
  { ticker: 'NVDA', name: 'NVIDIA Corporation', price: '$128.47', change: '+3.91%', trend: sparkUp2 },
]

const recentTrades = [
  { ticker: 'TSLA', name: 'Tesla Inc.', side: 'Buy', shares: 10, price: '$220.15', time: '2h ago' },
  { ticker: 'MSFT', name: 'Microsoft Corp.', side: 'Sell', shares: 5, price: '$415.30', time: '5h ago' },
]

const marketOverview = [
  { name: 'S&P 500', value: '5,344.20', change: '+0.84%', trend: sparkUp3 },
  { name: 'NASDAQ', value: '17,832.60', change: '+1.21%', trend: sparkUp },
]

const tickerData = [
  { name: 'S&P 500', value: '4,987.12', change: '+0.62%', up: true, trend: sparkUp3 },
  { name: 'NASDAQ', value: '15,658.40', change: '+0.73%', up: true, trend: sparkUp },
  { name: 'DOW JONES', value: '37,394.76', change: '+0.38%', up: true, trend: sparkUp2 },
  { name: 'BTC / USD', value: '59,876.21', change: '-0.41%', up: false, trend: sparkDown },
  { name: 'ETH / USD', value: '2,652.11', change: '+0.21%', up: true, trend: sparkUp },
]

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="chart-tooltip__label">{label}</p>
        <p className="chart-tooltip__value">${payload[0].value.toLocaleString()}</p>
      </div>
    )
  }
  return null
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

function getTodayFormatted() {
  return new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function Dashboard() {
  const [range, setRange] = useState('1M')
  const [selectedSector, setSelectedSector] = useState(null)
  const chartData = chartDataByRange[range]
  const greeting = getGreeting()
  const today = getTodayFormatted()

  return (
    <div>
      <div className="dash-header animate-slide-down">
        <div className="dash-header__left">
          <h1 className="page-title">
            {greeting}, <span className="text-accent">Sahil</span> 👋
          </h1>
          <p className="page-subtitle">Here's what's happening with your portfolio today.</p>
        </div>
        <button className="date-pill">📅 {today}</button>
      </div>

      <div className="stat-grid">
        <StatCard
          icon={<DollarSign size={18} color="var(--accent-blue-light)" />}
          iconBg="rgba(79, 108, 247, 0.15)"
          label="Portfolio Value"
          value="$271,243"
          changeLabel="vs last month"
          change="8.42% ($21,243)"
          changeType="up"
          sparkline={sparkUp}
          sparkColor="#4f6cf7"
        />
        <StatCard
          icon={<TrendingUp size={18} color="#2ecc71" />}
          iconBg="rgba(46, 204, 113, 0.15)"
          label="Today's P&L"
          value="+$3,344"
          changeLabel="unrealized"
          change="1.25%"
          changeType="up"
          sparkline={sparkUp2}
          sparkColor="#2ecc71"
        />
        <StatCard
          icon={<BarChart2 size={18} color="var(--accent-blue-light)" />}
          iconBg="rgba(79, 108, 247, 0.15)"
          label="Total Return"
          value="+$34,127"
          changeLabel="all time"
          change="14.38%"
          changeType="up"
          sparkline={sparkUp3}
          sparkColor="#4f6cf7"
        />
        <StatCard
          icon={<Layers size={18} color="#ff5c5c" />}
          iconBg="rgba(255, 92, 92, 0.15)"
          label="Open Positions"
          value="8"
          changeLabel="vs last week"
          change="2"
          changeType="down"
          sparkline={sparkDown}
          sparkColor="#ff5c5c"
        />
      </div>

      <div className="dashboard-charts">
        <div className="card chart-card">
          <div className="chart-card__header">
            <div>
              <p className="chart-card__title">Portfolio Value</p>
              <h3 className="chart-card__value">
                $271,243{' '}
                <span className="text-green chart-card__delta">
                  ↑ $21,243 (8.5%) all time
                </span>
              </h3>
            </div>
            <div className="range-tabs">
              {ranges.map((r) => (
                <button
                  key={r}
                  className={`range-tab ${range === r ? 'range-tab--active' : ''}`}
                  onClick={() => setRange(r)}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="chart-card__body">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4f6cf7" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#4f6cf7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border-color)" vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke="var(--text-muted)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--text-muted)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${v / 1000}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#4f6cf7"
                  strokeWidth={2}
                  fill="url(#portfolioGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-summary">
            <div>
              <p className="text-muted">Beginning Value</p>
              <p className="chart-summary__val">$250,000</p>
            </div>
            <div>
              <p className="text-muted">Net Deposits</p>
              <p className="chart-summary__val">$15,000</p>
            </div>
            <div>
              <p className="text-muted">Net Withdrawals</p>
              <p className="chart-summary__val text-red">-$2,500</p>
            </div>
            <div>
              <p className="text-muted">Change in Value</p>
              <p className="chart-summary__val text-green">+$21,243</p>
            </div>
          </div>

          <div className="market-ticker">
            {tickerData.map((t) => (
              <div className="market-ticker__item" key={t.name}>
                <p className="market-ticker__name">{t.name}</p>
                <div className="market-ticker__row">
                  <span className="market-ticker__value">{t.value}</span>
                  <span className={`market-ticker__change ${t.up ? 'text-green' : 'text-red'}`}>
                    {t.up ? '↑' : '↓'} {t.change}
                  </span>
                </div>
                <div className="market-ticker__spark">
                  <ResponsiveContainer width="100%" height={24}>
                    <AreaChart data={t.trend}>
                      <Area
                        type="monotone"
                        dataKey="v"
                        stroke={t.up ? '#2ecc71' : '#ff5c5c'}
                        strokeWidth={1.5}
                        fill="none"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ))}
            <div className="market-ticker__item">
              <p className="market-ticker__updated">Last updated</p>
              <p className="market-ticker__value">05:51 PM</p>
              <button className="market-ticker__refresh">🔄</button>
            </div>
          </div>
        </div>

        <div className="card allocation-card">
          <div className="allocation-card__header">
            <div>
              <p className="chart-card__title">Asset Allocation</p>
              <p className="text-muted allocation-card__sub">By sector — current portfolio</p>
            </div>
          </div>

          <div className="allocation-card__donut">
            <ResponsiveContainer width="100%" height={190}>
              <PieChart>
                <Pie
                  data={allocationData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={62}
                  outerRadius={88}
                  paddingAngle={2}
                  stroke="none"
                  onClick={(entry) => setSelectedSector(entry.name === selectedSector ? null : entry.name)}
                >
                  {allocationData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={entry.color}
                      opacity={selectedSector && selectedSector !== entry.name ? 0.35 : 1}
                      style={{ cursor: 'pointer' }}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="allocation-card__center">
              <span className="allocation-card__center-value">$271,243</span>
              <span className="allocation-card__center-label">Total</span>
            </div>
          </div>

          <ul className="allocation-list">
            {allocationData.map((item) => (
              <li
                key={item.name}
                onClick={() => setSelectedSector(item.name === selectedSector ? null : item.name)}
                className={selectedSector === item.name ? 'allocation-list__item--active' : ''}
              >
                <span className="allocation-list__dot" style={{ background: item.color }} />
                <span className="allocation-list__name">{item.name}</span>
                <span className="allocation-list__value">{item.value}%</span>
              </li>
            ))}
          </ul>

          {selectedSector && (
            <div className="sector-detail">
              <p className="sector-detail__label">{selectedSector}</p>
              <p className="sector-detail__amount">{sectorDetails[selectedSector].amount}</p>
              <p className="text-muted sector-detail__holdings">
                Holdings: {sectorDetails[selectedSector].holdings}
              </p>
            </div>
          )}

          <button className="view-all-btn">
            <PieIcon size={14} /> 
          </button>
        </div>
      </div>

      <div className="dash-bottom-grid">
        <div className="card panel-card">
          <div className="panel-card__header">
            <p className="chart-card__title">Top Performing Assets</p>
            <button className="view-all-link">View All <ChevronRight size={14} /></button>
          </div>
          {topAssets.map((a) => (
            <div className="asset-row" key={a.ticker}>
              <div className="asset-row__icon">{a.ticker.slice(0, 1)}</div>
              <div className="asset-row__info">
                <p className="asset-row__ticker">{a.ticker}</p>
                <p className="text-muted asset-row__name">{a.name}</p>
              </div>
              <div className="asset-row__spark">
                <ResponsiveContainer width="100%" height={28}>
                  <AreaChart data={a.trend}>
                    <Area type="monotone" dataKey="v" stroke="#2ecc71" strokeWidth={1.5} fill="none" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="asset-row__right">
                <p className="asset-row__price">{a.price}</p>
                <p className="text-green asset-row__change">↑ {a.change}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="card panel-card">
          <div className="panel-card__header">
            <p className="chart-card__title">Recent Trades</p>
            <button className="view-all-link">View All <ChevronRight size={14} /></button>
          </div>
          {recentTrades.map((t) => (
            <div className="trade-row" key={t.ticker}>
              <div className={`trade-row__icon ${t.side === 'Buy' ? 'trade-row__icon--buy' : 'trade-row__icon--sell'}`}>
                {t.ticker.slice(0, 1)}
              </div>
              <div className="asset-row__info">
                <p className="asset-row__ticker">{t.ticker}</p>
                <p className="text-muted asset-row__name">{t.name}</p>
              </div>
              <span className={`badge ${t.side === 'Buy' ? 'badge-green' : 'badge-red'}`}>{t.side}</span>
              <p className="text-secondary trade-row__shares">{t.shares} shares</p>
              <div className="asset-row__right">
                <p className="asset-row__price">{t.price}</p>
                <p className="text-muted asset-row__change">{t.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="card panel-card">
          <div className="panel-card__header">
            <p className="chart-card__title">Market Overview</p>
            <button className="view-all-link">View Market <ChevronRight size={14} /></button>
          </div>
          {marketOverview.map((m) => (
            <div className="market-row" key={m.name}>
              <div className="asset-row__info">
                <p className="asset-row__ticker">{m.name}</p>
                <p className="text-green asset-row__change">↑ {m.change}</p>
              </div>
              <div className="asset-row__spark">
                <ResponsiveContainer width="100%" height={28}>
                  <AreaChart data={m.trend}>
                    <Area type="monotone" dataKey="v" stroke="#2ecc71" strokeWidth={1.5} fill="none" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="asset-row__price market-row__value">{m.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}