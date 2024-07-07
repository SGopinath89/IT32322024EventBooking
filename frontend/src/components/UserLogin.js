import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../css/userstyle.css";
import dancing from "../assest/dancing.png";
import Swal from 'sweetalert2';

export default function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/user');
      const users = await response.json();
      const foundUser = users.find(user => user.email === email && user.password === password);
      const admin = users.find(user => user.email === email && user.password === password && user.role === "admin" );
      if (foundUser) {
        if(admin) {
          Swal.fire({
            title: 'Success',
            text: 'Welcome To Admin Panel',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          localStorage.setItem('id', foundUser.id);
          localStorage.setItem('username',foundUser.firstname);
          localStorage.setItem('admin','adminVaVTickets');
          console.log(localStorage.getItem('id'));
          navigate('/dashboard');
        }else{
          Swal.fire({
            title: 'Success',
            text: 'Login Successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          localStorage.setItem('id', foundUser.id);
          localStorage.setItem('username',foundUser.firstname)
          console.log(localStorage.getItem('id'));
          navigate('/');
        }
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",   
          text: "Incorrect Username or Password",
          confirmButtonText: 'OK',
          timer: 1500
        });
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      setLoginError('Invalid email or password');
    }
  };

  return (
    <div className='login-background'>
      <img src={dancing} className='login-dancing01' alt="dancing" />
      <img src={dancing} className='login-dancing02' alt="dancing" />
      <div className='login-rectangle'></div>
      <form className='login-form' onSubmit={handleLogin}>
        <h1 className='login-font'>Login</h1>
        {loginError && <div className="error-message">{loginError}</div>}
        <label className='login-font'>Email</label><br />
        <input
          type='email'
          className='login-textbox'
          placeholder='   username@gmail.com'
          value={email}
          onChange={handleEmailChange}
        /><br />

        <div className='login-padding'></div>

        <label className='login-font' style={{ marginBottom: "1px" }}>Password</label><br />
        <input
          type='password'
          className='login-textbox'
          placeholder='   Password'
          value={password}
          onChange={handlePasswordChange}
        />

        <div className='login-padding'></div>

        <a href='#' className='login-font login-forgot'>Forgot Password?</a><br />

        <button type='submit' className='login-signin'>Sign in</button>

        <div className='login-padding'></div>

        <label className='login-font login-para'>or continue with</label><br />

        <button type='button' className='login-direct' style={{ marginLeft: '13%' }}>
          <img src={"https://img.icons8.com/?size=100&id=17949&format=png&color=000000"} alt="icon" />
        </button>

        <button type='button' className='login-direct' style={{ marginLeft: '15%' }}>
          <img src={"https://img.icons8.com/?size=100&id=118497&format=png&color=000000"} style={{ width: '34px' }} alt="icon" />
        </button><br /><br />
        <label className='login-font' style={{ marginLeft: '10%' }}>Don’t have an account yet?</label>
        <a href='/registration'><label className='login-font'>Register for free</label></a>
      </form>
    </div>
  );
}
