import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/userstyle.css';
import logo from '../assest/logo.png';
import Swal from 'sweetalert2';

export default function UserNavbar() {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const isLoggedIn = !!localStorage.getItem('username');
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    Swal.fire({
      position: "top-end",
      icon: "success",   
      text: "Logout Successfully",
      timer: 1500
    });
    navigate('/');
  };

  return (
    <div className='home-logo'>
      <img src={logo} alt='Logo' />
      <label className='home-name'>VaVTickets</label>
      <ul>
        <li onClick={()=>navigate('/')}>Home</li>
        <li>Concert</li>
        <li onClick={()=>navigate('/about')}>About Us</li>
        <li onClick={()=>navigate('/contactus')}>Contact</li>
        <li
          onMouseEnter={() => setShowLogout(true)}
          onMouseLeave={() => setShowLogout(false)}
        >
          {
            !isLoggedIn ? (
              <button onClick={() => navigate('/login')}>Login</button>
            ) : (
              <div className='user-menu'>
                <button><i className="bi bi-person-circle fs-5"></i> {username} <i className="bi bi-caret-down-fill"></i></button>
                {showLogout && (
                  <div className='logout' onClick={handleLogout}>
                    Logout
                  </div>
                )}
              </div>
            )
          }
        </li>
      </ul>
    </div>
  );
}
