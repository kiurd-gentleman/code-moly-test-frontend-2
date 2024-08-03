// src/components/JobSearch.js

import React, { useState } from 'react';
import axios from 'axios';

function JobSearch() {
    const [jobs, setJobs] = useState([]);
    const [filters, setFilters] = useState({
        title: '',
        company: '',
        location: '',
        type: '',
        salary_min: '',
        salary_max: '',
        experience_level: '',
        industry: '',
        benefits: '',
        skills: '',
    });

    const handleInputChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleSearch = () => {
        axios.get('http://localhost:8000/api/jobs', { params: filters })
            .then(response => {
                setJobs(response.data.data);
            })
            .catch(error => {
                console.error('There was an error fetching the jobs!', error);
            });
    };

    return (
        <div>
            <h1>Job Search</h1>
            <div>
                <input type="text" name="title" placeholder="Job Title" onChange={handleInputChange} />
                <input type="text" name="company" placeholder="Company" onChange={handleInputChange} />
                <input type="text" name="location" placeholder="Location" onChange={handleInputChange} />
                <select name="type" onChange={handleInputChange}>
                    <option value="">Job Type</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                </select>
                <input type="number" name="salary_min" placeholder="Min Salary" onChange={handleInputChange} />
                <input type="number" name="salary_max" placeholder="Max Salary" onChange={handleInputChange} />
                <input type="number" name="experience_level" placeholder="Experience Level" onChange={handleInputChange} />
                <input type="text" name="industry" placeholder="Industry" onChange={handleInputChange} />
                <input type="text" name="benefits" placeholder="Benefits" onChange={handleInputChange} />
                <input type="text" name="skills" placeholder="Skills" onChange={handleInputChange} />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div>
                {jobs.map(job => (
                    <div key={job.id}>
                        <h2>{job.title}</h2>
                        <p>{job.company.name}</p>
                        <p>{job.location}</p>
                        <p>{job.type}</p>
                        <p>${job.salary_min} - ${job.salary_max}</p>
                        <p>{job.experience_level} years experience</p>
                        <p>{job.industry}</p>
                        <p>Benefits: {job.benefits.join(', ')}</p>
                        <p>Skills: {job.skills.join(', ')}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default JobSearch;
