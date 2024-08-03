// src/components/JobList.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function JobList() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        console.log('useEffect');
        axios.get('http://localhost:8000/api/jobs')
            .then(response => setJobs(response.data.data))
            .catch(error => console.error('There was an error fetching the jobs!', error));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/jobs/${id}`)
            .then(() => setJobs(jobs.filter(job => job.id !== id)))
            .catch(error => console.error('There was an error deleting the job!', error));
    };

    return (
        <div>
            <h1>Jobs</h1>
            <Link to="/jobs/create">Create Job</Link>
            <ul>
                {jobs.map(job => (
                    <li key={job.id}>
                        <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                        <Link to={`/jobs/${job.id}/edit`}>Edit</Link>
                        <button onClick={() => handleDelete(job.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default JobList;
