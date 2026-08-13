import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import Dashboard from './pages/Dashboard'
import Portfolio from './pages/Portfolio'
import Markets from './pages/Markets'
import Watchlist from './pages/Watchlist'
import TradeHistory from './pages/TradeHistory'
import Analytics from './pages/Analytics'
import Reports from './pages/Reports'
import Accounts from './pages/Accounts'
import Settings from './pages/Settings'
import Topbar from './components/Topbar/Topbar'


function App() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
        <main className="app-main">
            <Topbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/trade-history" element={<TradeHistory />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App