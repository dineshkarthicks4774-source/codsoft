import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/jobs")
      .then(res => setJobs(res.data));
  }, []);

  return (
    <div className="container">
      <h2>Job Listings</h2>
      {jobs.map(job => (
        <div key={job._id} className="card p-3 m-2">
          <h4>{job.title}</h4>
          <p>{job.company}</p>
          <Link to={`/jobs/${job._id}`} className="btn btn-info">
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}
<input
  type="text"
  onChange={(e) => {
    axios.get(`http://localhost:5000/api/jobs/search/${e.target.value}`)
      .then(res => setJobs(res.data));
  }}
/>