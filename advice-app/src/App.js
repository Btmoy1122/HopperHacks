import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import CalendarPage from './CalendarPage';
import Chatbot from './Chatbot';
import Journal from './Journal';
import { images } from './images';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <h1>Health Bot AI</h1>
        </header>

        <nav className="navbar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/calendar">Calendar</Link></li>
            <li><Link to="/chatbot">Chatbot</Link></li>
            <li><Link to="/journal">Journal</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/journal" element={<Journal />} />
        </Routes>

        <footer className="footer">
          <p>&copy; 2023 My Awesome Website. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <main className="main-content">
      <section className="about-section">
        <h2>About Me</h2>
        <p>
          I am a passionate developer who loves building amazing websites. With a focus on clean
          design and user experience, I bring ideas to life.
        </p>
      </section>
      <section className="services-section">
        <h2>My Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>Appointment</h3>
            <p>Click on the pirate calendar to set up an appointment to meet with a doctor!!</p>
            <Link to="/calendar">
              <button style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}>
                <img
                  src={images.appointments}
                  alt="Button Image"
                  style={{ width: '150px', height: 'auto' }}
                />
              </button>
            </Link>
          </div>
          <div className="service-card">
            <h3>ChatBot</h3>
            <p>Click on Josh the pirate doctor to talk to a virtual assistant!!</p>
            <Link to="/chatbot">
              <button style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}>
                <img
                  src={images.chatbot}
                  alt="Chatbot Image"
                  style={{ width: '150px', height: 'auto' }}
                />
              </button>
            </Link>
          </div>
          <div className="service-card">
            <h3>Journal</h3>
            <p>Click on David to journal about your thoughts!!</p>
            <Link to="/journal">
              <button style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}>
                <img
                  src={images.journal}
                  alt="Journal Image"
                  style={{ width: '150px', height: 'auto' }}
                />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function Services() {
  return <h2>Services Page</h2>;
}

function Contact() {
  return (
    <div className="contact-page">
      <h2>Contact Us</h2>
      <p>
        If you have any questions, feedback, or need assistance, feel free to reach out to us. We're
        here to help!
      </p>

      <div className="contact-container">
        <div className="contact-box">
          <img
            src={images.person1}
            alt="Person 1"
            className="contact-image"
          />
          <div className="contact-details">
            <h3>Brandon Moy</h3>
            <p><strong>Email:</strong> brandon.moy@stonybrook.edu</p>
          </div>
        </div>

        <div className="contact-box">
          <img
            src={images.person2}
            alt="Person 2"
            className="contact-image"
          />
          <div className="contact-details">
            <h3>Harry Martin</h3>
            <p><strong>Email:</strong> harrsion.martin@stonybrook.edu</p>
          </div>
        </div>

        <div className="contact-box">
          <img
            src={images.person3}
            alt="Person 3"
            className="contact-image"
          />
          <div className="contact-details">
            <h3>Charles Cheung</h3>
            <p><strong>Email:</strong> charles.cheung.2@stonybrook.edu</p>
          </div>
        </div>
      </div>
      <h4><strong>Address:</strong> 400 Circle Rd, Stony Brook, NY 11794</h4>
    </div>
  );
}





/*function Contact() {
  return (
    <div className="contact-page">
      <h2>Contact Us</h2>
      <p>
        If you have any questions, feedback, or need assistance, feel free to reach out to us. We're
        here to help!
      </p>
      <div className="contact-info">
        <h3>Our Contact Information</h3>
        <ul>
          <li><strong>Brandon Moy's Email:</strong> brandon.moy@stonybrook.edu</li>

          <li><strong>Harry Martin's Email:</strong> harrsion.martin@stonybrook.edu</li>
          <li><strong>Charles Cheung's Email:</strong> charles.cheung.2@stonybrook.edu</li>
          <li><strong>Address:</strong> 400 Circle Rd, Stony Brook, NY 11794</li>
        </ul>
      </div>
    </div>
  );
}*/

export default App;
