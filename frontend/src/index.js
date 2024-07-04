import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router,Routes,Route,Navigate }  from 'react-router-dom';
import UserLogin from './components/UserLogin';
import HomePage from './components/HomePage';
import UserRegistration from './components/UserRegistration';
import UserBooking from './components/UserBooking';
import UserReservation from './components/UserReservation';
import Dashboard from './components/admin/Dashboard';
import Allevent from './components/admin/Allevent';
import Addevent from './components/admin/Addevent';
import Removeevent from './components/admin/Removeevent';
import Payment from './components/admin/Payment';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/login" element={<UserLogin/>}></Route>
      <Route path="/registration" element={<UserRegistration/>}></Route>
      <Route path="/booking/:id" element={<UserBooking/>}></Route>
      <Route path="/reservation/:id" element={<UserReservation/>}></Route>

      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/allevent" element={<Allevent/>}></Route>
      <Route path="/addevent" element={<Addevent/>}></Route>
      <Route path="/removeevent" element={<Removeevent/>}></Route>
      <Route path="/payment" element={<Payment/>}></Route>
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
