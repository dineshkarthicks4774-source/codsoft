import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Jobs.css';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/jobs")
      .then(res => setJobs(res.data));
  }, []);

  const handleSearch = (value) => {
    setSearch(value);
    if (value) {
      axios.get(`http://localhost:5000/api/jobs/search/${value}`)
        .then(res => setJobs(res.data));
    } else {
      axios.get("http://localhost:5000/api/jobs")
        .then(res => setJobs(res.data));
    }
  };

  return (
    <div className="jobs-container">
      <div className="jobs-header">
        <h2>Job Listings</h2>
        <input
          type="text"
          placeholder="Search jobs..."
          className="search-input"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="jobs-grid">
        {jobs.map(job => (
          <div key={job._id} className="job-card">
            <h4 className="job-title">{job.title}</h4>
            <p className="job-company">{job.company}</p>
            <p className="job-location">📍 {job.location}</p>
            {job.salary && <p className="job-salary">💰 {job.salary}</p>}
            <Link to={`/jobs/${job._id}`} className="view-btn">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}