// src/App.js

import React, {useContext} from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import JobList from './components/JobList';
import JobForm from './components/JobForm';
import CompanyList from './components/CompanyList';
import CompanyForm from './components/CompanyForm';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import {AuthContext, AuthProvider} from "./context/AuthContext";

function PrivateRoute({children}) {
    const {user} = useContext(AuthContext);
    return user ? children : <Navigate to="/login"/>;

}
function AuthRedirect({children}) {
    const {user} = useContext(AuthContext);
    return user ? <Navigate to="/dashboard"/> : children;
}
function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Navigation/>
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
