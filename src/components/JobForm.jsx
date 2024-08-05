import React, { useState, useEffect } from 'react';
import axios from './../config/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { TagsInput } from "react-tag-input-component";
import { Card, CardBody, CardTitle } from 'react-bootstrap';
import { getJobTypes, getCategory } from '../services/JobService';


function JobForm() {
    const [job, setJob] = useState({
        title: '',
        company_id: '',
        location: '',
        job_type_id: '',
        category_id: '',
        salary_min: '',
        salary_max: '',
        experience_level: '',
        industry: '',
        benefits: [],
        skills: []
    });
    const [companies, setCompanies] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [jobTypes, setJobTypes] = useState([]);
    const [category, setCategory] = useState([]);


    useEffect(() => {
        axios.get('/companies')
            .then(response => setCompanies(response.data));
        if (id) {
            axios.get(`/jobs/${id}`)
                .then(response => {
                    setJob(response.data);
                });
        }
    }, [id]);

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
        setJob({ ...job, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const jobData = {
            ...job
        };

        if (id) {
            axios.put(`/jobs/${id}`, jobData)
                .then(() => navigate('/jobs'))
                .catch(error => {
                    setError(error.response.data.errors);
                    console.error('Job update error', error);
                });
            // .then(() => navigate('/jobs'));
        } else {
            axios.post('/jobs', jobData)
                .then(() => navigate('/jobs'))
                .catch(error => {
                    setError(error.response.data.errors);
                    console.error('Job create error', error);
                });
            // .then(() => navigate('/jobs'));
        }
    };

    return (
        <div className="container mx-auto">
            <div className="mt-5 w-50 mx-auto">
                <Card className="border-0 mt-5" style={{ backgroundColor: 'rgb(237 237 237)' }}>
                    <CardBody>
                        <CardTitle>{id ? 'Edit' : 'Create'} Job</CardTitle>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className="form-label">Title</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="title"
                                    value={job.title}
                                    onChange={handleChange}
                                />
                                {error.title && <p className="text-danger">{error.title[0]}</p>}
                            </div>
                            <div>
                                <label className="form-label">Company</label>
                                <select
                                    className="form-control"
                                    name="company_id"
                                    value={job.company_id}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Company</option>
                                    {companies.map(company => (
                                        <option key={company.id} value={company.id}>{company.name}</option>
                                    ))}
                                </select>
                                {error.company_id && <p className="text-danger">{error.company_id[0]}</p>}
                            </div>
                            <div>
                                <label className="form-label">Location</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="location"
                                    value={job.location}
                                    onChange={handleChange}
                                />
                                {error.location && <p className="text-danger">{error.location[0]}</p>}
                            </div>
                            <div>
                                <label className="form-label">Job Type</label>
                                <select
                                    className="form-control"
                                    name="job_type_id"
                                    value={job.job_type_id}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Job Type</option>
                                    {jobTypes.map(jobType => (
                                        <option key={jobType.id} value={jobType.id}>{jobType.name}</option>
                                    ))}
                                </select>
                                {error.job_type_id && <p className="text-danger">{error.job_type_id[0]}</p>}
                            </div>
                            <div>
                                <label className="form-label">Category</label>
                                <select
                                    className="form-control"
                                    name="category_id"
                                    value={job.category_id}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Category</option>
                                    {category.map(category => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                                {error.category_id && <p className="text-danger">{error.category_id[0]}</p>}
                            </div>
                            <div>
                                <label className="form-label">Salary Min</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="salary_min"
                                    value={job.salary_min}
                                    onChange={handleChange}
                                />
                                {error.salary_min && <p className="text-danger">{error.salary_min[0]}</p>}
                            </div>
                            <div>
                                <label className="form-label">Salary Max</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="salary_max"
                                    value={job.salary_max}
                                    onChange={handleChange}
                                />
                                {error.salary_max && <p className="text-danger">{error.salary_max[0]}</p>}
                            </div>
                            <div>
                                <label className="form-label">Experience Level</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="experience_level"
                                    value={job.experience_level}
                                    onChange={handleChange}
                                />
                                {error.experience_level && <p className="text-danger">{error.experience_level[0]}</p>}
                            </div>
                            <div>
                                <label className="form-label">Industry</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="industry"
                                    value={job.industry}
                                    onChange={handleChange}
                                />
                                {error.industry && <p className="text-danger">{error.industry[0]}</p>}
                            </div>
                            <div>
                                <label className="form-label">Benefits</label>
                                {/* <input
                        type="text"
                        name="benefits"
                        value={job.benefits}
                        onChange={handleChange}
                    /> */}
                                <TagsInput
                                    value={job.benefits}
                                    onChange={(tags) => setJob({ ...job, benefits: tags })}
                                    name="benefits"
                                    placeHolder="enter benefits"
                                />
                                {error.benefits && <p className="text-danger">{error.benefits[0]}</p>}
                            </div>
                            <div>
                                <label className="form-label">Skills</label>
                                <TagsInput
                                    value={job.skills}
                                    onChange={(tags) => setJob({ ...job, skills: tags })}
                                    name="skills"
                                    placeHolder="enter skills"
                                />
                                {error.skills && <p className="text-danger">{error.skills[0]}</p>}
                                {/* <input
                        type="text"
                        name="skills"
                        value={job.skills}
                        onChange={handleChange}
                    /> */}
                            </div>
                            <button className="btn btn-dark mt-3" type="submit">{id ? 'Update' : 'Create'}</button>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default JobForm;

