// src/App.js

import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import JobList from './components/JobList';
import JobForm from './components/JobForm';
import CompanyList from './components/CompanyList';
import CompanyForm from './components/CompanyForm';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import JobDetails from './components/JobDetails';
import { AuthContext, AuthProvider } from "./context/AuthContext";
import Loading from './components/Loading';

// Component to protect private routes
function PrivateRoute({ children }) {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <Loading/>; // Display loading spinner or message
    }

    return user ? <>{children}</> : <Navigate to="/login" />;
}

// Component to redirect authenticated users away from login/register
function AuthRedirect({ children }) {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <Loading/>; // Display loading spinner or message
    }

    return user ? <Navigate to="/dashboard" /> : children;
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Navigation />
                    <Routes>
                        <Route path="/login" element={
                            <AuthRedirect>
                                <Login />
                            </AuthRedirect>
                        } />
                        <Route path="/register" element={
                            <AuthRedirect>
                                <Register />
                            </AuthRedirect>
                        } />
                        <Route path="/" element={
                            <AuthRedirect>
                                <Login />
                            </AuthRedirect>
                        } />
                        <Route path="/dashboard" element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        } />
                        <Route path="/jobs/create" element={
                            <PrivateRoute>
                                <JobForm />
                            </PrivateRoute>
                        } />
                        <Route path="/jobs/:id/edit" element={
                            <PrivateRoute>
                                <JobForm />
                            </PrivateRoute>
                        } />
                        <Route path="/jobs/:id" element={
                            <PrivateRoute>
                                <JobDetails />
                            </PrivateRoute>
                        } />
                        <Route path="/jobs" element={
                            <PrivateRoute>
                                <JobList />
                            </PrivateRoute>
                        } />
                        <Route path="/companies/create" element={
                            <PrivateRoute>
                                <CompanyForm />
                            </PrivateRoute>
                        } />
                        <Route path="/companies/:id/edit" element={
                            <PrivateRoute>
                                <CompanyForm />
                            </PrivateRoute>
                        } />
                        <Route path="/companies" element={
                            <PrivateRoute>
                                <CompanyList />
                            </PrivateRoute>
                        } />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
