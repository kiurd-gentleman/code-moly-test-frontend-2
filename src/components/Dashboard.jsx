// src/components/JobList.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function JobList() {
    const [jobs, setJobs] = useState([]);
    return (
        <div>
            <h1>Jobs</h1>
            {/*<Link to="/jobs/create">Create Job</Link>*/}
            <h1>Dashboard</h1>
        </div>
    );
}

export default JobList;
