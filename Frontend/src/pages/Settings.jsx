import { useState } from 'react'
import { User, Bell, Shield, Palette, Check } from 'lucide-react'
import './Settings.css'

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'preferences', label: 'Preferences', icon: Palette },
]

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile')
  const [toast, setToast] = useState(null)
  const [notifSettings, setNotifSettings] = useState({
    priceAlerts: true,
    tradeConfirmations: true,
    weeklyReports: false,
    newsUpdates: false,
  })

  function toggleNotif(key) {
    setNotifSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  function showToast(message) {
    setToast(message)
    setTimeout(() => setToast(null), 2500)
  }

  return (
    <div>
      <h1 className="page-title animate-slide-down">Settings</h1>
      <p className="page-subtitle animate-slide-down">
        Manage your account, security, and preferences.
      </p>

      <div className="settings-layout">
        <div className="settings-tabs">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`settings-tab ${activeTab === t.id ? 'settings-tab--active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              <t.icon size={16} />
              {t.label}
            </button>
          ))}
        </div>

        <div className="card settings-panel">
          {activeTab === 'profile' && (
            <div>
              <p className="chart-card__title">Profile</p>
              <div className="settings-field">
                <label>Full Name</label>
                <input type="text" defaultValue="Sahil Chettri" />
              </div>
              <div className="settings-field">
                <label>Email</label>
                <input type="email" defaultValue="sahil@example.com" />
              </div>
              <div className="settings-field">
                <label>Phone</label>
                <input type="text" defaultValue="+91 98765 43210" />
              </div>
              <button
                className="settings-save-btn"
                onClick={() => showToast('Profile saved successfully')}
              >
                Save Changes
              </button>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <p className="chart-card__title">Notifications</p>
              {Object.entries({
                priceAlerts: 'Price Alerts',
                tradeConfirmations: 'Trade Confirmations',
                weeklyReports: 'Weekly Reports',
                newsUpdates: 'News Updates',
              }).map(([key, label]) => (
                <div className="settings-toggle-row" key={key}>
                  <span>{label}</span>
                  <button
                    className={`toggle-switch ${notifSettings[key] ? 'toggle-switch--on' : ''}`}
                    onClick={() => toggleNotif(key)}
                  >
                    <span className="toggle-switch__thumb" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <p className="chart-card__title">Security</p>
              <div className="settings-field">
                <label>Current Password</label>
                <input type="password" placeholder="••••••••" />
              </div>
              <div className="settings-field">
                <label>New Password</label>
                <input type="password" placeholder="••••••••" />
              </div>
              <button
                className="settings-save-btn"
                onClick={() => showToast('Password updated successfully')}
              >
                Update Password
              </button>
              <div className="settings-divider" />
              <div className="settings-toggle-row">
                <span>Two-Factor Authentication</span>
                <span className="badge badge-green"><Check size={11} /> Enabled</span>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div>
              <p className="chart-card__title">Preferences</p>
              <div className="settings-toggle-row">
                <span>Currency</span>
                <select className="settings-select" defaultValue="USD">
                  <option>USD</option>
                  <option>EUR</option>
                  <option>INR</option>
                  <option>GBP</option>
                </select>
              </div>
              <div className="settings-toggle-row">
                <span>Time Zone</span>
                <select className="settings-select" defaultValue="IST">
                  <option>IST</option>
                  <option>EST</option>
                  <option>UTC</option>
                  <option>PST</option>
                </select>
              </div>
              <div className="settings-toggle-row">
                <span>Default Chart Range</span>
                <select className="settings-select" defaultValue="1M">
                  <option>1D</option>
                  <option>1W</option>
                  <option>1M</option>
                  <option>1Y</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {toast && (
        <div className="settings-toast">
          <Check size={16} /> {toast}
        </div>
      )}
    </div>
  )
}