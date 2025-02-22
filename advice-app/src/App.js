import React from 'react';
import './App.css';


function App() {
  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1>Health Bot AI</h1>
        <p>How may I help you?</p>
      </header>

      {/* Navbar */}
      <nav className="navbar">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>

      {/* Main Content */}
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
              <p>Set up an appointment!!</p>
            </div>
            <div className="service-card">
              <h3>ChatBot</h3>
              <p>Talk to a chat bot and tell them your problems!!</p>
            </div>
            <div className="service-card">
              <h3>SEO Optimization</h3>
              <p>Improving your website's visibility on search engines.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2023 My Awesome Website. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;