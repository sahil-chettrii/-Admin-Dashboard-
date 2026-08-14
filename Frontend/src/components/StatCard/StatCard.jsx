import { AArrowDown , AArrowUp, Badge, Upload } from "lucide-react";
import "./StatCard.css"

export default function StatCard ({icon, iconBg, label, value, changeLabel, change, changeType}){
  // changeType: 'up' | 'down'//

const isUp =changeType === 'up'

return(
    <div className="stat-card card">
        <div className="tat-card__top">
            <div className="stat-card__icon" style={{background : iconBg}}>
                {icon}
            </div>
            <span className={`badge ${isUp ? 'badge-green' : 'badge-red'}`}>
          {isUp ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
          {change}
        </span>
        </div>

        <p className="stat-card__lable">{label}</p>
        <h3 className="stat-card__value">{value}</h3>
        <p className="stat-card__sub text-muted">{changeLabel}</p>
    </div>
)
}