import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/userstyle.css";
import dancing from "../assest/dancing.png";
import Swal from 'sweetalert2';

export default function UserRegistration() {
  
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    reEnterPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.reEnterPassword) {
        Swal.fire({
            position: "top-end",
            icon: "error",   
            text: "Do not match passwords",
            confirmButtonText: 'OK',
            timer: 1500
          });
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: '', 
          firstname: formData.name.split(' ')[0],
          lastname: formData.name.split(' ')[1],
          email: formData.email,
          regno: '', 
          password: formData.password
        })
      });

      if (response.ok) {
        Swal.fire({
            position: "top-end",
            icon: "success",   
            text: "Registration Successfully",
            confirmButtonText: 'OK',
            timer: 1500
        });
        navigate('/login');
        setFormData({
          name: '',
          email: '',
          password: '',
          reEnterPassword: ''
        });
      } else {
        Swal.fire({
            position: "top-end",
            icon: "error",   
            text: "There has Empty Field/Fields ",
            confirmButtonText: 'OK',
            timer: 1500
          });
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className='login-background'>
      <img src={dancing} className='login-dancing01' alt="dancing" />
      <img src={dancing} className='login-dancing02' alt="dancing" />
      <div className='login-rectangle'></div>
      <form className='reg-form' onSubmit={handleSubmit}>
        <h1 className='login-font'>Registration</h1>
        <label className='login-font'>Name</label><br />
        <input
          type='text'
          className='reg-textbox'
          placeholder='Amal Perera'
          name='name'
          value={formData.name}
          onChange={handleChange}
        /><br />

        <div className='login-padding'></div>

        <label className='login-font' style={{ marginBottom: "1px" }}>Email</label><br />
        <input
          type='email'
          className='reg-textbox'
          placeholder='username@gmail.com'
          name='email'
          value={formData.email}
          onChange={handleChange}
        />

        <div className='login-padding'></div>

        <label className='login-font' style={{ marginBottom: "1px" }}>Password</label><br />
        <input
          type='password'
          className='reg-textbox'
          placeholder='Password'
          name='password'
          value={formData.password}
          onChange={handleChange}
        />

        <div className='login-padding'></div>

        <label className='login-font' style={{ marginBottom: "1px" }}>Re-Enter Password</label><br />
        <input
          type='password'
          className='reg-textbox'
          placeholder='ReEnter Password'
          name='reEnterPassword'
          value={formData.reEnterPassword}
          onChange={handleChange}
        />

        <div className='login-padding'></div>

        <button type='submit' className='reg-signup'>Sign up</button>

        <div className='login-padding'></div>

        <hr className='reg-line'/><label className='login-font reg-para'>or</label><hr className='reg-line'/><br />
        
        <button type='button' className='login-direct' style={{ marginLeft: '13%' }}>
          <img src={"https://img.icons8.com/?size=100&id=17949&format=png&color=000000"} alt="icon" />
        </button>

        <button type='button' className='login-direct' style={{ marginLeft: '15%' }}>
          <img src={"https://img.icons8.com/?size=100&id=118497&format=png&color=000000"} style={{ width: '34px' }} alt="icon" />
        </button><br /><br />
        <label className='login-font' style={{ marginLeft: '15%' }}>Do you have an account?</label>
        <a href='/login'><label className='login-font'>Sign in</label></a>
      </form>
    </div>
  )
}
