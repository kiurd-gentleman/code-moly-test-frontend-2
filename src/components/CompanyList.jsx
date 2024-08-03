// src/components/CompanyList.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CompanyList() {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/companies')
            .then(response => setCompanies(response.data))
            .catch(error => console.error('There was an error fetching the companies!', error));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/companies/${id}`)
            .then(() => setCompanies(companies.filter(company => company.id !== id)))
            .catch(error => console.error('There was an error deleting the company!', error));
    };

    return (
        <div>
            <h1>Companies</h1>
            <Link to="/companies/create">Create Company</Link>
            <ul>
                {companies.map(company => (
                    <li key={company.id}>
                        <Link to={`/companies/${company.id}`}>{company.name}</Link>
                        <Link to={`/companies/${company.id}/edit`}>Edit</Link>
                        <button onClick={() => handleDelete(company.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CompanyList;
