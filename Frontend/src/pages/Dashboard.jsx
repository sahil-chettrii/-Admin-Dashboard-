import { useState } from "react";
import {
      DollarSign,
  TrendingUp,
  BarChart2,
  Layers,
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

import StatCard from "../components/StatCard/StatCard";
import './Dashbord.css'

const charData = [
    {date : 'jul 14', value : 2500000},
    { date: 'Jul 18', value: 253000 },
    { date: 'Jul 22', value: 249000 },
    { date: 'Jul 26', value: 251000 },
    { date: 'Jul 30', value: 255000 },
    { date: 'Aug 3', value: 260000 },
    { date: 'Aug 7', value: 265000 },
    { date: 'Aug 11', value: 271243 },
] 



const allocationData = [
  { name: 'Technology', value: 38.4, color: 'var(--chart-1)' },
  { name: 'Healthcare', value: 18.2, color: 'var(--chart-2)' },
  { name: 'Financials', value: 15.6, color: 'var(--chart-3)' },
  { name: 'Consumer', value: 14.1, color: 'var(--chart-4)' },
  { name: 'Energy', value: 8.7, color: 'var(--chart-5)' },
  { name: 'Other', value: 5, color: 'var(--chart-6)' },
]

const ranges = ['1D' , '1W' , "1M" , '1Y', 'ALL']
function CustomeTooltip({active, payload , label}){
    if(active && payload && payload.length){
        return(
            <div className="charts-tooltip">
                <p className="chart-tooltip__label">{label}</p>
                <p className="charts-tooltip__value">${payload[0].value.tolocalString()}</p>
            </div>
        )
    }
    return null
}

export default function Dashboard(){
    const [range , setRange] = useState('1M')
    return(
        <div>
            <h1 className="page-title">Good morning , Sahil  👋 </h1>
            <p className="page-subtitle">
                 Here's what's happening with your portfolio today, Aug 14, 2026.
            </p>
            <div className="stat-grid">
                <StatCard 
                icon={<DollarSign size={18} color="var(--accent-blue-light)" />}
                iconBg='rgba(79,108,247,0.15)'
                label= "Portfolio Value"
                value='$271,243'
                changeLabel='vs last month'
                change='+8.42%'
                changeType='up'
                />
                <StatCard
                icon={<BarChart2 size={18} color="var(--accent-blue-ligth)"/>}
                iconBg="rgba(79, 108, 247, 0.15)"
          label="Total Return"
          value="+$34,127"
          changeLabel="all time"
          change="+14.38%"
          changeType="up"
        />
        <StatCard
          icon={<Layers size={18} color="var(--accent-blue-light)" />}
          iconBg="rgba(79, 108, 247, 0.15)"
          label="Open Positions"
          value="8"
          changeLabel="vs last week"
          change="-2"
          changeType="down"
        />
            </div>
            <div className="dashbord-charts">
                
            </div>
        </div>
    )
}
