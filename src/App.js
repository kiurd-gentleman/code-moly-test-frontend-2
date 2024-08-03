// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import JobList from './components/JobList';
import JobForm from './components/JobForm';
import CompanyList from './components/CompanyList';
import CompanyForm from './components/CompanyForm';
import Navigation from './components/Navigation';

function App() {
    return (
        <Router>
            <div className="App">
                <Navigation />
                <Routes >
                    <Route path="/jobs/create" element={<JobForm/>} />
                    <Route path="/jobs/:id/edit" element={<JobForm/>} />
                    <Route path="/jobs" element={<JobList/>} />
                    <Route path="/companies/create" element={<CompanyForm/>} />
                    <Route path="/companies/:id/edit" element={<CompanyForm/>} />
                    <Route path="/companies" element={<CompanyList/>} />
                </Routes >
            </div>
        </Router>
    );
}

export default App;
