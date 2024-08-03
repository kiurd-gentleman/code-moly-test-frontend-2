// src/components/JobForm.js

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

function JobForm() {
    const [job, setJob] = useState({
        title: '',
        company_id: '',
        location: '',
        type: '',
        salary_min: '',
        salary_max: '',
        experience_level: '',
        industry: '',
        benefits: '',
        skills: ''
    });
    const [companies, setCompanies] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/companies')
            .then(response => setCompanies(response.data));

        if (id) {
            axios.get(`http://localhost:8000/api/jobs/${id}`)
                .then(response => {
                    const jobData = response.data;
                    setJob({
                        ...jobData,
                        benefits: jobData.benefits.join(', '),
                        skills: jobData.skills.join(', ')
                    });
                });
        }
    }, [id]);

    const handleChange = (e) => {
        setJob({...job, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const jobData = {
            ...job,
            benefits: job.benefits.split(',').map(b => b.trim()),
            skills: job.skills.split(',').map(s => s.trim())
        };

        if (id) {
            axios.put(`http://localhost:8000/api/jobs/${id}`, jobData)
                // .then(() => navigate('/jobs'));
        } else {
            axios.post('http://localhost:8000/api/jobs', jobData)
                // .then(() => navigate('/jobs'));
        }
    };

    return (
        <div>
            <h2>{id ? 'Edit' : 'Create'} Job</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={job.title}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Company</label>
                    <select
                        name="company_id"
                        value={job.company_id}
                        onChange={handleChange}
                    >
                        <option value="">Select Company</option>
                        {companies.map(company => (
                            <option key={company.id} value={company.id}>{company.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Location</label>
                    <input
                        type="text"
                        name="location"
                        value={job.location}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Type</label>
                    <input
                        type="text"
                        name="type"
                        value={job.type}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Salary Min</label>
                    <input
                        type="number"
                        name="salary_min"
                        value={job.salary_min}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Salary Max</label>
                    <input
                        type="number"
                        name="salary_max"
                        value={job.salary_max}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Experience Level</label>
                    <input
                        type="number"
                        name="experience_level"
                        value={job.experience_level}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Industry</label>
                    <input
                        type="text"
                        name="industry"
                        value={job.industry}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Benefits</label>
                    <input
                        type="text"
                        name="benefits"
                        value={job.benefits}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Skills</label>
                    <input
                        type="text"
                        name="skills"
                        value={job.skills}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">{id ? 'Update' : 'Create'}</button>
            </form>
        </div>
    );
}

export default JobForm;

