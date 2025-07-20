import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <main>
      <div style={{ padding: '5rem 2rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h1>Welcome to Codex: The Collaborative World-Building Atlas</h1>
        <p style={{ fontSize: '1.2rem', color: '#555' }}>
          Your ultimate tool for creating, managing, and sharing intricate fictional worlds.
          Bring your stories to life with interconnected wikis, interactive maps, and detailed timelines.
        </p>
        <div style={{ marginTop: '2rem' }}>
          <Link to="/signup" style={{ ...buttonStyles, backgroundColor: '#28a745' }}>Get Started</Link>
          <Link to="/login" style={{ ...buttonStyles, marginLeft: '1rem' }}>Login</Link>
        </div>
      </div>
    </main>
  );
}

// Simple inline styles for buttons to avoid needing another CSS file yet
const buttonStyles = {
    padding: '0.8rem 1.5rem',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold'
};

export default HomePage;