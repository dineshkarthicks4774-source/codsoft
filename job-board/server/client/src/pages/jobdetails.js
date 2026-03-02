import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState();
  const [resume, setResume] = useState();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/jobs/${id}`)
      .then(res => setJob(res.data));
  }, [id]);

  const applyJob = async () => {
    const formData = new FormData();
    formData.append("jobId", id);
    formData.append("candidateId", "USER_ID_HERE");
    formData.append("resume", resume);

    await axios.post("http://localhost:5000/api/applications", formData);
    alert("Applied Successfully!");
  };

  return job && (
    <div className="container">
      <h2>{job.title}</h2>
      <p>{job.description}</p>
      <input type="file" onChange={(e)=>setResume(e.target.files[0])}/>
      <button className="btn btn-success" onClick={applyJob}>
        Apply
      </button>
    </div>
  );
}