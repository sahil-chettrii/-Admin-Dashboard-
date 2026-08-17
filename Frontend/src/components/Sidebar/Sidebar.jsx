import { NavLink } from 'react-router-dom'
import {
  LayoutGrid,
  TrendingUp,
  BarChart3,
  Bookmark,
  FileText,
  Activity,
  PieChart,
  Users,
  Settings,
  ChevronLeft,
  Zap,
} from 'lucide-react'
import "./Sidebar.css"

const mainlink = [
  { to: '/', label: 'Dashboard', icon: LayoutGrid },
  { to: '/portfolio', label: 'Portfolio', icon: TrendingUp },
  { to: '/markets', label: 'Markets', icon: BarChart3 },
  { to: '/watchlist', label: 'Watchlist', icon: Bookmark },
  { to: '/trade-history', label: 'Trade History', icon: FileText },
]

const otherlink = [
  { to: '/analytics', label: 'Analytics', icon: Activity },
  { to: '/reports', label: 'Reports', icon: PieChart },
  { to: '/accounts', label: 'Accounts', icon: Users },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ collapsed, onToggle }) {
  return (
    <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
      <div className="sidebar__logo">
        <div className="sidebar__logo-icon">
          <Zap size={18} />
        </div>
        {!collapsed && <span>TradeDesk</span>}
      </div>

      <div className="sidebar__scroll">
        <div className="sidebar__section">
          {!collapsed && <p className='sidebar__label'>MENU</p>}
          <ul>
            {mainlink.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
                  }
                >
                  <Icon size={18} />
                  {!collapsed && <span>{label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar__section">
          {!collapsed && <p className="sidebar__label">OTHERS</p>}
          <ul>
            {otherlink.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
                  }
                >
                  <Icon size={18} />
                  {!collapsed && <span>{label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {!collapsed && (
        <div className="sidebar__status">
          <p className="sidebar__status-label">Market Status</p>
          <div className="sidebar__status-row">
            <span className="sidebar__status-dot" />
            Market Open
          </div>
          <p className="sidebar__status-time">17 Aug 2026, 05:51 PM</p>
        </div>
      )}

      <button className="sidebar__collapse" onClick={onToggle}>
        <ChevronLeft size={16} className={collapsed ? 'flip' : ''} />
        {!collapsed && <span>Collapse</span>}
      </button>
    </aside>
  )
}