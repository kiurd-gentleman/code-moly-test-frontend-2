import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../config/axios';
import { Card, CardBody } from 'react-bootstrap';
import './JobDetails.css';

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await axios.get(`/jobs/${id}`);
                setJob(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="container mx-auto">
            <div className="mt-5 w-50 mx-auto">
                <Card className="border-0 mt-5" style={{ backgroundColor: 'rgb(237 237 237)' }}>
                    <CardBody>
                        <div className="job-details">
                            <div className="job-header">
                                <h1>{job.title}</h1>
                                <p className="company-name">{job.company.name}</p>
                            </div>
                            <div className="job-info">
                                <p><strong>Location:</strong> {job.location}</p>
                                <p><strong>Job Type:</strong> {job.job_type.name}</p>
                                <p><strong>Category:</strong> {job.category.name}</p>
                                <p><strong>Salary:</strong> {job.salary_min}$ - {job.salary_max}$</p>
                                <p><strong>Posted:</strong> {new Date(job.created_at).toLocaleDateString()}</p>
                                <p><strong>Experience: {job.experience_level}</strong></p>
                                <p><strong>Benefits:</strong></p>
                                <ul>
                                    {job.benefits.map(benefit => (
                                        <li key={benefit}>{benefit}</li>
                                    ))}
                                </ul>
                                <p><strong>Skills:</strong></p>
                                <ul>
                                    {job.skills.map(skill => (
                                        <li key={skill}>{skill}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="job-description">
                                <h2>Job Description</h2>
                                <p>{job.description}</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default JobDetails;
