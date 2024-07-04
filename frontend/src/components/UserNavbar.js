import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/userstyle.css'
import logo from '../assest/logo.png';
export default function UserNavbar() {
    const navigate = useNavigate();
  return (
    <div className='home-logo'>
        <img src={logo} alt='Logo' />
        <label className='home-name'>VaVTickets</label>
        <ul>
          <li>Schedule</li>
          <li>Concert</li>
          <li>Ticket</li>
          <li>Contact</li>
          <li><button onClick={()=>navigate('/login')}>Login</button></li>
        </ul>
      </div>
  )
}
