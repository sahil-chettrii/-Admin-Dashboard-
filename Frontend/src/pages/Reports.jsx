import { FileText, Download, Calendar, TrendingUp, PieChart, Receipt } from 'lucide-react'
import './Reports.css'

const reportTypes = [
  { icon: TrendingUp, title: 'Performance Summary', desc: 'Full portfolio performance over any date range.' },
  { icon: PieChart, title: 'Asset Allocation', desc: 'Breakdown of holdings by sector and asset class.' },
  { icon: Receipt, title: 'Tax Statement', desc: 'Realized gains/losses formatted for tax filing.' },
  { icon: FileText, title: 'Trade Log', desc: 'Complete record of all executed trades.' },
]

const recentReports = [
  { name: 'Performance Summary — July 2026', date: 'Aug 1, 2026', size: '412 KB' },
  { name: 'Tax Statement — Q2 2026', date: 'Jul 5, 2026', size: '188 KB' },
  { name: 'Trade Log — June 2026', date: 'Jul 1, 2026', size: '96 KB' },
  { name: 'Asset Allocation — June 2026', date: 'Jun 30, 2026', size: '210 KB' },
]

export default function Reports() {
  return (
    <div>
      <h1 className="page-title animate-slide-down">Reports</h1>
      <p className="page-subtitle animate-slide-down">
        Generate and download reports for your portfolio.
      </p>

      <div className="report-types-grid">
        {reportTypes.map((r) => (
          <div className="card report-type-card" key={r.title}>
            <div className="report-type-card__icon">
              <r.icon size={18} color="var(--accent-blue-light)" />
            </div>
            <p className="report-type-card__title">{r.title}</p>
            <p className="text-muted report-type-card__desc">{r.desc}</p>
            <button className="report-generate-btn">
              <Calendar size={13} /> Generate
            </button>
          </div>
        ))}
      </div>

      <div className="card recent-reports-card">
        <p className="chart-card__title">Recent Reports</p>
        <div className="recent-reports-list">
          {recentReports.map((r) => (
            <div className="recent-report-row" key={r.name}>
              <div className="recent-report-row__icon">
                <FileText size={16} />
              </div>
              <div className="recent-report-row__info">
                <p className="recent-report-row__name">{r.name}</p>
                <p className="text-muted recent-report-row__meta">{r.date} · {r.size}</p>
              </div>
              <button className="recent-report-row__download">
                <Download size={15} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}