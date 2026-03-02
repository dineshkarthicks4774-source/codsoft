import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container mt-5">
      <h1>Welcome to Job Board</h1>
      <Link to="/jobs" className="btn btn-primary">Browse Jobs</Link>
    </div>
  );
}