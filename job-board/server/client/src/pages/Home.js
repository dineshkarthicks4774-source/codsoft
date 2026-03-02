import React from "react";
import { Link } from "react-router-dom";
import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Find Your Dream Job</h1>
        <p className="hero-subtitle">Discover thousands of opportunities from top companies</p>
        <Link to="/jobs" className="cta-button">Browse Jobs</Link>
      </div>
    </div>
  );
}