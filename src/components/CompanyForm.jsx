// src/components/CompanyForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate , useParams } from 'react-router-dom';

function CompanyForm() {
    const [company, setCompany] = useState({ name: '', size: '' });
    const { id } = useParams();
    const navigate  = useNavigate ();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8000/api/companies/${id}`)
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
            axios.put(`http://localhost:8000/api/companies/${id}`, company)
                // .then(() => navigate('/companies'));
        } else {
            axios.post('http://localhost:8000/api/companies', company)
                // .then(() => navigate('/companies'));
        }
    };

    return (
        <div>
            <h2>{id ? 'Edit' : 'Create'} Company</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={company.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Size</label>
                    <input
                        type="text"
                        name="size"
                        value={company.size}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">{id ? 'Update' : 'Create'}</button>
            </form>
        </div>
    );
}

export default CompanyForm;
