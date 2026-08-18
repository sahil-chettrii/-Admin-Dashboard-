import { useState , useRef , useEffect } from "react";
import { Search, Bell,  Moon, Sun, ChevronDown } from "lucide-react";
import './Topbar.css'

export default function Topbar(){
    const [query , setQuery] = useState('')
    const [darkMode, setDarkMode] = useState(true)
    const [showNotifs , setshowNotifs] = useState(false)
    const [showUsermenu , setshowUsermenu] = useState(false)
    const notifRef = useRef(null)
        const userRef = useRef(null)

  // Close dropdowns when clicking  ///

  useEffect(()=> {
    function handleClickOutside(e) {
           if(notifRef.current && !notifRef.current.contains(e.target)){
            setshowNotifs(false)
           }
           if(userRef.current && !userRef.current.contains(e.target)){
            setshowUsermenu(false)
           }
    }
    document.addEventListener('mousedown' ,handleClickOutside)
    return() => document.removeEventListener('mousedown',handleClickOutside)
  },[])


 const Notifications = [
    {id:1, text: 'APPL crossed you price alert of $250', time: '5m ago'},
    {id:2, text: 'Trade executed: Bought 10 shares of TSLA', time: '1h ago'},
    {id:3, text: 'Weekly portfolio report is ready', time: '3h ago'},
 ]

 function toggleTheme() {
  const next = darkMode ? 'light' : 'dark'
  setDarkMode(!darkMode)
  document.documentElement.setAttribute('data-theme', next)
}

 return(
    <header className="topbar">
        <div className="topbar__search">
            <search size = {16} className="topbar__search-icon" />
            <input 
            type="text"
            placeholder="Search assets, trades..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            />
        </div>

    <div className="topbar__actions">
        <button className="topbar__icon-btn" onClick={toggleTheme} title="Toggle theme">
          {darkMode ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <div className="topbar__dropdown-wrap" ref={notifRef}>
            <button
              className="topbar__icon-btn" onClick={()=> setshowNotifs(!showNotifs)}
              title="Notifiaction">
                <Bell size={18}/>
                {Notifications.length > 0 && <span className="topbar_-dot"/>}
            </button>
            {showNotifs && (
                <div className="topbar__dropdown topbar__dropdown--notifs">
                    <div className="topbar__dropdown-header">Notifications</div>
                    {Notifications.map((n) => (
                        <div key={n.id} className="topbar__notif-item">
                            <p>{n.text}</p>
                            <span>{n.time}</span>
                            </div>
                    ))}
                    </div>
            )}
        </div>
    </div>

    <div className="topbar__dropdown-wrap" ref={userRef}>
        <button className="topbar__user" onClick={() => setshowUsermenu(!showUsermenu)}>
         <div className="topbar__avatar">SC</div>
         <span>Sahil Chettri </span>
         <ChevronDown size={14}/>
        </button>

   {showUsermenu && (
    <div className="topbar__dropdown topbar__dropdown--user">
        <button className="topbar__dropdown-item">Profile</button>
        <button className="topbar__dropdown-it">Account settings</button>
        <button className="topbar__dropdown-item topbar__dropdown-item--danger">
            log out 
        </button>

        </div>
   )}
    </div>
    </header>
 )

}