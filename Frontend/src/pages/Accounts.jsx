import { Landmark, CreditCard, Wallet, Plus, MoreVertical } from 'lucide-react'
import './Accounts.css'

const accounts = [
  { icon: Landmark, name: 'Brokerage Account', institution: 'Fidelity', balance: 271243, type: 'Investment', status: 'Active' },
  { icon: Wallet, name: 'Retirement (401k)', institution: 'Vanguard', balance: 84520, type: 'Retirement', status: 'Active' },
  { icon: CreditCard, name: 'Checking Account', institution: 'Chase Bank', balance: 12840, type: 'Cash', status: 'Active' },
  { icon: Wallet, name: 'Crypto Wallet', institution: 'Coinbase', balance: 9310, type: 'Crypto', status: 'Active' },
]

export default function Accounts() {
  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0)

  return (
    <div>
      <h1 className="page-title animate-slide-down">Accounts</h1>
      <p className="page-subtitle animate-slide-down">
        Manage the accounts linked to your portfolio.
      </p>

      <div className="card accounts-total-card">
        <p className="text-secondary">Total Balance Across Accounts</p>
        <h2 className="accounts-total-value">
          ${totalBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </h2>
      </div>

      <div className="accounts-grid">
        {accounts.map((a) => (
          <div className="card account-card" key={a.name}>
            <div className="account-card__top">
              <div className="account-card__icon">
                <a.icon size={18} color="var(--accent-blue-light)" />
              </div>
              <button className="account-card__menu">
                <MoreVertical size={16} />
              </button>
            </div>
            <p className="account-card__name">{a.name}</p>
            <p className="text-muted account-card__institution">{a.institution}</p>
            <h3 className="account-card__balance">
              ${a.balance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </h3>
            <div className="account-card__footer">
              <span className="badge badge-green">{a.status}</span>
              <span className="text-muted account-card__type">{a.type}</span>
            </div>
          </div>
        ))}

        <button className="account-card account-card--add">
          <Plus size={20} />
          <span>Link New Account</span>
        </button>
      </div>
    </div>
  )
}