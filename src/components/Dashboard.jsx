// src/components/JobList.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardBody } from 'react-bootstrap';
import { getJobTypes, getCategory } from '../services/JobService';

function JobList() {
    const [jobs, setJobs] = useState([]);
    const [jobTypes, setJobTypes] = useState([]);
    const [category, setCategory] = useState([]);
    const [search, setSearch] = useState({
        category_id: '',
        job_type_id: '',
    });

    useEffect(() => {
        getJobTypes().then(response => {
            setJobTypes(response.data);
        });
    }, []);

    useEffect(() => {
        getCategory().then(response => {
            setCategory(response.data);
        });
    }, []);
    const handleChange = (e) => {
        // console.log(e.target.value);
        setSearch({ ...search, [e.target.name]: e.target.value });
    };
    return (
        <div className="container mx-auto">
            <div className="mt-5 mx-auto">
                <Card className="border-0 mt-5" style={{ backgroundColor: 'rgb(237 237 237)' }}>
                    <CardBody>
                        <div className="d-flex justify-content-between">
                            <h1>Dashboard</h1>
                            <Link to="/jobs/create" className="btn btn-sm my-auto btn-primary">Create Job</Link>
                        </div>
                        <div className="mt-4 p-5 bg-white rounded text-black">
                            <h1>Wellcome to the Job Board</h1>
                            <p>To visit job list please go to the Job List</p>
                        </div>
                        <div className="mt-5">
                            <form>
                                <div className="row">
                                    <div className="form-group col-md-4">
                                        <label className="form-label" htmlFor="search">Search</label>
                                        <input type="text"
                                            className="form-control"
                                            id="search"
                                            placeholder="Search"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group col-md-2">
                                        <label className="form-label">Category</label>
                                        <select
                                            className="form-control"
                                            name="category_id"
                                            value={search.category_id}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Category</option>
                                            {category.map(category => (
                                                <option key={category.id} value={category.id}>{category.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-2">
                                        <label className="form-label">Job Type</label>
                                        <select
                                            className="form-control"
                                            name="job_type_id"
                                            value={search.job_type_id}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Job Type</option>
                                            {jobTypes.map(jobType => (
                                                <option key={jobType.id} value={jobType.id}>{jobType.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label className="form-label">Salary Range</label>
                                        <div class="input-group mb-3">
                                            <input type="text"
                                                onChange={handleChange}
                                                class="form-control"
                                                name="min_salary"
                                                placeholder="Min Salary"
                                                aria-label="min_salary"
                                            />
                                            <span class="input-group-text">-</span>
                                            <input type="text"
                                                onChange={handleChange}
                                                name="max_salary"
                                                class="form-control"
                                                placeholder="Max Salary"
                                                aria-label="max_salary"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-1 form-label">
                                        <button type="submit" className="btn btn-primary btn-sm" style={{ marginTop: '34px' }}>Submit</button>
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <h1>Job List</h1>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Title</th>
                                                <th scope="col">Location</th>
                                                <th scope="col">Company</th>
                                                <th scope="col">Salary</th>
                                                <th scope="col">Type</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {jobs.map((job) => (
                                                <tr key={job.id}>
                                                    <td>{job.title}</td>
                                                    <td>{job.location}</td>
                                                    <td>{job.company}</td>
                                                    <td>{job.salary}</td>
                                                    <td>{job.type}</td>
                                                    <td>
                                                        <Link to={`/jobs/${job.id}`} className="btn btn-sm btn-primary">View</Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default JobList;
