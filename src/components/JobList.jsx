// src/components/JobList.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from './../config/axios';
import { Card, CardBody, CardTitle } from 'react-bootstrap';

function JobList() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        console.log('useEffect');
        axios.get('/jobs')
            .then(response => setJobs(response.data.data))
            .catch(error => console.error('There was an error fetching the jobs!', error));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`/jobs/${id}`)
            .then(() => setJobs(jobs.filter(job => job.id !== id)))
            .catch(error => console.error('There was an error deleting the job!', error));
    };

    return (
        <div className="container mx-auto">
            <div className="mt-5 mx-auto">
                <Card className="border-0" style={{ backgroundColor: 'rgb(237 237 237)' }}>
                    <CardBody>
                        <div className="d-flex justify-content-between">
                            <CardTitle >
                                <h1>Jobs</h1>
                            </CardTitle>
                            <Link className="float-end btn btn-sm btn-dark my-auto btn-primary" to="/jobs/create">Create Job</Link>
                        </div>
                        <ol class="list-group list-group-numbered">
                            {jobs && jobs.map(job => (
                                <li key={job.id} class="list-group-item border-0 d-flex justify-content-between align-items-start">
                                    <div class="ms-2 me-auto">
                                        <div class="fw-bold">{job.title} ({job.salary_min}$ - {job.salary_max}$)</div>
                                        <small>{job.type}</small>
                                        
                                        <div>Company: {job.company.name}</div>
                                    </div>
                                    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                        <Link className="btn btn-info btn-sm" to={`/jobs/${job.id}`}>Details</Link>
                                        <Link className="btn btn-sm btn-warning btn-sm" to={`/jobs/${job.id}/edit`}>Edit</Link>
                                        <button className="btn btn-sm btn-danger btn-sm" onClick={() => handleDelete(job.id)}>Delete</button>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default JobList;
