import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from './../config/axios';
import { Card, CardBody, CardTitle } from 'react-bootstrap';
import { PaginationControl } from 'react-bootstrap-pagination-control';

function JobList() {
    const [jobs, setJobs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchJobs = async (page) => {
        setLoading(true);
        try {
            const response = await axios.get(`/jobs?page=${page}`);
            setJobs(response.data.data);
            setTotalPages(response.data.last_page);
            setLoading(false);
        } catch (error) {
            console.error('There was an error fetching the jobs!', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs(page);
    }, [page]);

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
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <ol className="list-group list-group">
                                {jobs && jobs.map(job => (
                                    <li key={job.id} className="list-group-item border-0 d-flex justify-content-between align-items-start">
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">{job.title} ({job.salary_min}$ - {job.salary_max}$)</div>
                                            <small>{job.type}</small>
                                            <div>Company: {job.company.name}</div>
                                        </div>
                                        <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                            <Link className="btn btn-info btn-sm" to={`/jobs/${job.id}`}>Details</Link>
                                            <Link className="btn btn-sm btn-warning btn-sm" to={`/jobs/${job.id}/edit`}>Edit</Link>
                                            <button className="btn btn-sm btn-danger btn-sm" onClick={() => handleDelete(job.id)}>Delete</button>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        )}
                        <PaginationControl
                            className="mt-4"
                            page={page}
                            between={4}
                            total={totalPages * 10} // Adjust if necessary based on items per page
                            limit={10}
                            changePage={(page) => {
                                setPage(page);
                            }}
                            ellipsis={1}
                        />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default JobList;
