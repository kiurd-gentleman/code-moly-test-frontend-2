// src/components/JobList.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardBody } from 'react-bootstrap';

function JobList() {
    const [jobs, setJobs] = useState([]);
    return (
        <div className="container mx-auto">
            <div className="mt-5 mx-auto">
                <Card className="border-0 mt-5" style={{ backgroundColor: 'rgb(237 237 237)' }}>
                    <CardBody>
                        <div className="d-flex justify-content-between">
                            <h1>Dashboard</h1>
                            <Link to="/jobs/create" className="btn btn-sm my-auto btn-primary">Create Job</Link>
                        </div>
                        <div class="mt-4 p-5 bg-white rounded text-black">
                            <h1>Wellcome to the Job Board</h1>
                            <p>To visit job list please go to the Job List</p>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default JobList;
