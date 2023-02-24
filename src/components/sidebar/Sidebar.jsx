import DashboardIcon from '@mui/icons-material/Dashboard';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ViewStreamOutlinedIcon from '@mui/icons-material/ViewStreamOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import "./sidebar.scss"

import {Link} from "react-router-dom";
import { useContext } from 'react';
import { DarkModeContext } from '../../context/darkModeContext';

const Sidebar = () => {

  const { dispatch } = useContext(DarkModeContext)

  return (
    <div className="sidebar">

      <div className="topT">
        <Link to= "/" style={{textDecoration:"none"}}>
          <span className="logo">Admin</span>
        </Link>
      </div>

      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className='icon'/>
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>

          <Link to= "/users" style={{textDecoration:"none"}}>
            <li>
              <Person2OutlinedIcon className='icon'/>
              <span>Users</span>
            </li>
          </Link>

          <Link to= "/products" style={{textDecoration:"none"}}>
            <li>
              <CategoryOutlinedIcon className='icon'/>
              <span>Products</span>
            </li>
          </Link>

          <li>
            <ViewStreamOutlinedIcon className='icon'/>
            <span>Orders</span>
          </li>
          <li>
            <LocalShippingOutlinedIcon className='icon'/>
            <span>Delivery</span>
          </li>
          <p className="title">USEFUL</p>
          <li>
            <BarChartOutlinedIcon className='icon'/>
            <span>Stats</span>
          </li>
          <li>
            <NotificationsOutlinedIcon className='icon'/>
            <span>Notifications</span>
          </li>
          <p className="title">SERVICES</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className='icon'/>
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className='icon'/>
            <span>Logs</span>
          </li>
          <li>
            <SettingsOutlinedIcon className='icon'/>
            <span>Settings</span>
          </li>
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className='icon'/>
            <span>Profile</span>
          </li>
          <li>
            <LogoutOutlinedIcon className='icon'/>
            <span>Logout</span>
          </li>
            <p className="title">THEME</p>
        </ul>
    </div>
      <div className="bottomT">
        <div className="colorOption" onClick={() => dispatch({type: "LIGHT"})}></div>
        <div className="colorOption" onClick={() => dispatch ({type: "DARK"})}></div>
      </div>
    </div>
  )
}

export default Sidebar