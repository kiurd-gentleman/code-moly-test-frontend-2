// src/components/CompanyForm.js

import React, { useState, useEffect } from 'react';
import axios from '../config/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardBody, CardTitle } from 'react-bootstrap';

function CompanyForm() {
    const [company, setCompany] = useState({ name: '', size: '' });
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            axios.get(`/companies/${id}`)
                .then(response => {
                    setCompany(response.data);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        setCompany({ ...company, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            axios.put(`/companies/${id}`, company)
                .then(() => navigate('/companies'))
                .catch(error => {
                    setError(error.response.data.errors);
                    console.error('Company update error', error);
                });
        } else {
            axios.post('/companies', company)
                .then(() => navigate('/companies'))
                .catch(error => {
                    setError(error.response.data.errors);
                    console.error('Company create error', error);
                });
        }
    };

    return (
        <div className="container mx-auto">
            <div className="mt-5 w-50 mx-auto">
                <Card className="border-0 mt-5" style={{ backgroundColor: 'rgb(237 237 237)' }}>
                    <CardBody>
                        <CardTitle>{id ? 'Edit' : 'Create'} Company</CardTitle>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className="form-label">Name</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="name"
                                    value={company.name}
                                    onChange={handleChange}
                                />
                                {error.name && <p className="text-danger">{error.name[0]}</p>}
                            </div>
                            <div>
                                <label className="form-label">Size</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="size"
                                    value={company.size}
                                    onChange={handleChange}
                                />
                                {error.size && <p className="text-danger">{error.size[0]}</p>}
                            </div>
                            <button className="btn btn-dark mt-3" type="submit">{id ? 'Update' : 'Create'}</button>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default CompanyForm;
