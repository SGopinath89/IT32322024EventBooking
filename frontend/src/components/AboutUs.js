import React, { useEffect, useRef, useState } from 'react';
import UserNavbar from './UserNavbar';
import "../css/userstyle.css";
import bookingheader from "../assest/fireWork.jpeg";
import about1 from "../assest/about-1.jpeg";
import about2 from "../assest/about-2.jpeg";

export default function AboutUs() {
    const rowsRef = useRef([]);
  
  useEffect(() => {
    
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    rowsRef.current.forEach(row => {
      if (row) {
        observer.observe(row);
      }
    });

    return () => {
      if (rowsRef.current) {
        rowsRef.current.forEach(row => observer.unobserve(row));
      }
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
  };

  const addToRefs = (el) => {
    if (el && !rowsRef.current.includes(el)) {
      rowsRef.current.push(el);
    }
  };
  return (
    <div className='about'>
      <img src={bookingheader} className='booking-header' alt="Booking Header" />
      <UserNavbar />
      <h1 className='about-header'>ABOUT US</h1>
      <div className='about-stage fade-in' ref={addToRefs}>
      <img src={about1} className='about-left' />
      <div className='about-right'>
      <h3 >About Us</h3>
      
      <p >
        Welcome to VavTickets, your premier destination for booking tickets to the most exciting events around! At VavTickets, we believe that life is meant to be celebrated, and there’s no better way to do so than by attending live events that inspire, entertain, and connect us. Our platform is designed to make it easy for you to discover, plan, and attend unforgettable experiences, whether you’re a music lover, a sports enthusiast, or simply looking for a fun day out with family and friends.
      </p>
      <p >
        With VavTickets, finding the perfect event has never been easier. Our extensive listings cover a wide range of categories, including concerts, sports, festivals, and more. Whether you’re searching for the latest concert by your favorite artist, a high-energy sports match, or a family-friendly festival, our intuitive search tools and curated recommendations ensure you’ll never miss out on the action.
      </p>
      </div>
      </div>
      <div className='about-stage fade-in' ref={addToRefs}>
      
      <div className='about-left'>
      <h3 >Who We Are</h3>
      <p >
        At VavTickets, we are passionate about bringing people together through the power of live events. Founded in [Year], our company has quickly become a trusted platform for event enthusiasts and organizers alike. We strive to offer a seamless ticket purchasing experience, providing access to a diverse range of events including concerts, sports, festivals, and more.
      </p>

      <h3 >Our Mission</h3>
      <p >
        Our mission is to connect people with the events they love. We aim to make event ticket booking simple, accessible, and enjoyable. Whether you're looking for the hottest concert in town, an edge-of-your-seat sports match, or a family-friendly festival, VavTickets is here to help you find the perfect event.
      </p>
      </div>
      <img src={about2} className='about-right' />
      </div>
    </div>
  );
}
