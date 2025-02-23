import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import CalendarPage from './CalendarPage'; // Ensure this import is correct

function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <h1>Health Bot AI</h1>
          <p>How may I help you?</p>
        </header>

        <nav className="navbar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/calendar">Calendar</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
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
                  src="https://files.oaiusercontent.com/file-Sf1naEe5GvGC7io4ofeGen?se=2025-02-23T01%3A06%3A49Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D8c3cdbfe-7fa8-4880-bac7-b2c9307fbda0.webp&sig=wAliWxdNhSpvu4Wvw6gI9KN2eJFsNqaT/vTJfqq7ItU%3D"
                  alt="Button Image"
                  style={{ width: '150px', height: 'auto' }}
                />
              </button>
            </Link>
          </div>
          <div className="service-card">
            <h3>ChatBot</h3>
            <p>Click on Josh the pirate doctor to talk to a virtual assistant!</p>
            <button style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}>
              <img
                src="https://files.oaiusercontent.com/file-RwrwzxMQ9pp2SyZgGTDZ87?se=2025-02-23T03%3A05%3A16Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dacbc81bc-e158-4945-8755-c58724776da6.webp&sig=kr4e7ci9jBCO9s8tq9KLMOPNOZGdUuhWf2RbX6%2BXGTM%3D"
                alt="Button Image"
                style={{ width: '150px', height: 'auto' }}
              />
            </button>
          </div>
          <div className="service-card">
            <h3>SEO Optimization</h3>
            <p>Improving your website's visibility on search engines.</p>
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
  return <h2>Contact Page</h2>;
}

export default App;
