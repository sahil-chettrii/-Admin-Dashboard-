import { ArrowUp, ArrowDown } from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area } from 'recharts'
import "./StatCard.css"
 
export default function StatCard ({
      icon,
  iconBg,
  label,
  value,
  changeLabel,
  change,
  changeType,
  sparkline,
  sparkColor
}) {

    const isUp = changeType === 'up'
    return (
        <div className="stat-card card">
            <div className="stat-card__top">
                <div className="stat-card__icon" style={{background:iconBg}}>
                    {icon}
                </div>
                <div className="stat-card__label-wrap">
                    <p className='stat-card__label'>{label}</p>
                </div>
            </div>
            <h3 className='stat-card__vakue'>{value}</h3>
            <div className="stat-card__chang">
                <span className={isUp ? 'text-green' : 'text-red'}>
          {isUp ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
          {change}
        </span>
        <span className="text-muted">{changeLabel}</span>
            </div>
            <div className="stat-card__spark">
                <ResponsiveContainer width="100%" height={40}>
                    <AreaChart data={sparkline} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`spark-${label}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={sparkColor} stopOpacity={0.4} />
                <stop offset="100%" stopColor={sparkColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              stroke={sparkColor}
              strokeWidth={1.5}
              fill={`url(#spark-${label})`}
            />
          </AreaChart>
        </ResponsiveContainer>
            </div>
        </div>
    )
}