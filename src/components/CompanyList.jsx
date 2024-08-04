// src/components/CompanyList.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from './../config/axios';
import { Card, CardBody, CardTitle } from 'react-bootstrap';

function CompanyList() {
    const [companies, setCompanies] = useState([]);


    useEffect(() => {
        axios.get('/companies')
            .then(response => setCompanies(response.data))
            .catch(error => console.error('There was an error fetching the companies!', error));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`/companies/${id}`)
            .then(() => setCompanies(companies.filter(company => company.id !== id)))
            .catch(error => console.error('There was an error deleting the company!', error));
    };

    return (
        <div className="container mx-auto">
            <div className="mt-5 mx-auto">
                <Card className="border-0" style={{ backgroundColor: 'rgb(237 237 237)' }}>
                    <CardBody>
                        <div className="d-flex justify-content-between">
                            <CardTitle >
                                <h1>Companies</h1>
                            </CardTitle>
                            <Link className="float-end btn btn-sm btn-dark my-auto btn-primary" to="/companies/create">Create Company</Link>
                        </div>
                        <ol class="list-group list-group-numbered">
                            {companies && companies.map(company => (
                                <li class="list-group-item border-0 d-flex justify-content-between align-items-start">
                                    <div class="ms-2 me-auto">
                                        <div class="fw-bold">{company.name}</div>
                                        {company.size}
                                    </div>
                                    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                        {/* <button type="button" class="btn btn-danger">Left</button> */}
                                        {/* <button type="button" class="btn btn-warning">Middle</button> */}
                                        {/* <button type="button" class="btn btn-success">Right</button> */}
                                        <Link className="btn btn-info btn-sm">Jobs</Link>
                                        <Link className="btn btn-sm btn-warning btn-sm" to={`/companies/${company.id}/edit`}>Edit</Link>
                                        <button className="btn btn-sm btn-danger btn-sm" onClick={() => handleDelete(company.id)}>Delete</button>
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

export default CompanyList;
