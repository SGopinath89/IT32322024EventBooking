import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import slide1 from '../assest/slide1.jpg';
import slide2 from '../assest/slide2.jpg';
import slide3 from '../assest/slide3.jpg';
import event1 from '../assest/event1.jpeg';
import event2 from '../assest/event2.jpeg';
import event3 from '../assest/event3.jpeg';
import event4 from '../assest/event4.jpeg';
import logo from '../assest/logo.png';
import booknow from '../assest/cr-event.png';
import '../css/userstyle.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageFooter from './PageFooter';
import UserNavbar from './UserNavbar';

export default function HomePage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedEvents, setDisplayedEvents] = useState(6); 
  const rowsRef = useRef([]);
  
  useEffect(() => {
    fetchEvents();
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
  
  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:8080/event');
      const data = await response.json();
      
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };
  
  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8080/event/search?ename=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error searching events:', error);
    }
  };

  const handleEvent = (id) => {
    navigate(`/booking/${id}`);
  }

  const getMonthName = (monthNumber) => {
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return monthNames[monthNumber - 1];
  };

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

  const loadMoreEvents = () => {
    setDisplayedEvents(prev => prev + 6);
  };

  return (
    <div className='home-header'>
      <Slider {...settings} className='home-header-slide'>
        <div>
          <img src={slide1} alt='Slide 1' className='home-header' />
        </div>
        <div>
          <img src={slide2} alt='Slide 2' className='home-header' />
        </div>
        <div>
          <img src={slide3} alt='Slide 3' className='home-header' />
        </div>
      </Slider>
      <UserNavbar/>
      <div className='home-subtopics fade-in' ref={addToRefs}>
        <h1>VaVTickets</h1>
        <p>Unlocking Seamless Event Experiences with<br />Our Ticketing System!</p>
        <div className='home-subtopics-buttons'>
          <a href='#upcoming'><button > Get Tickets</button></a>
          <button onClick={()=>navigate('/about')}> About Us </button>
        </div>
      </div>
      <div className='home-header-fade'></div>
      <div className='home-search'>
        <span>
          <label>Search Event</label><br />
          <input 
            type='textbox' 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
        </span>
        <span>
          <label>Place</label><br />
          <input type='textbox' />
          
        </span>
        <span>
          <label>Date</label><br />
          <input type='date' />
          
        </span>
      </div>

      <div className='home-upcoming'>
        <h2 id='upcoming'>Upcoming Events</h2>
        <select>
          <option>Weekdays</option>
          <option>Weekends</option>
        </select>
        <select>
          <option disabled>Event Type</option>
          <option>Sinhala Event</option>
        </select>
        <select>
          <option>Any Category</option>
        </select>
      </div>

      <div className='home-upcoming-sub'>
        <div className="container py-5">
          <div className="row fade-in" ref={addToRefs}>
            {events.slice(0, displayedEvents).map(event => (
              <div className="col-sm-4 home-event" key={event.eid} value={event.eid} onClick={() => handleEvent(event.eid)}>
                <div className='home-event-compo'>
                  <img src={event1} alt={event.ename} /><br />
                  <span className='home-mmdd'>
                    <label className='home-month'>{getMonthName(parseInt(event.date.split('-')[1]))}</label><br />
                    <label className='home-date'>{event.date.split('-')[2]}</label>
                  </span>
                  <label className='home-event-name'>{event.ename}</label>
                </div>
              </div>
            ))}
          </div>
          {events.length > displayedEvents && (
            <center><button className='home-loadmore py-2 px-5' onClick={loadMoreEvents}>Load More</button></center>
          )}
        </div>
      </div>

      <div className='home-booknow'>
        <img src={booknow}/>
        <span className='home-booknow-content fade-in' ref={addToRefs}>
          <h1>Book Your Ticket For Event</h1>
          <p>Book your ticket Now! and enjoy our EVENTS</p>
          <button>BOOK NOW</button>
        </span>
      </div>

      <div className='home-recent-event'>
        <h2>Recent Events Photos</h2>
        <div className="container py-5">
          <div className="row fade-in" ref={addToRefs}>
            <div className="col-sm-4">
              <img src={event2} alt="Event 1" /><br />
            </div>
            <div className="col-sm-4">
              <img src={event3} alt="Event 1" /><br />
            </div>
            <div className="col-sm-4">
              <img src={event4} alt="Event 1" /><br />
            </div>
          </div>
        </div>
      </div>

      <PageFooter/>
    </div>
  );
}
