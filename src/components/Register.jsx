// src/components/Register.js

import React, { useContext, useState } from 'react';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import { Card } from "react-bootstrap";

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);
    const [error, setError] = useState('');



    const handleSubmit = (e) => {
        e.preventDefault();
        register(name, email, password, passwordConfirmation).then(response => {
            //after register automatically login
            localStorage.setItem('token', response.data.token);
            // save user data in to setUser context
            setUser(response.data.user);
            navigate('/dashboard');
        }).catch(error => {
            setError(error.response.data.errors);
            console.error('Registration error', error);
        });
    };

    return (
        <div className="container mx-auto">
            <div className="mt-5 w-50 mx-auto">
                <Card className="border-0 mt-5" style={{ backgroundColor: 'rgb(237 237 237)' }}>
                    <Card.Body>
                        <Card.Title className="text-center">Register</Card.Title>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className="form-label">Name</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                {error.name && <p className="text-danger">{error.name[0]}</p>}

                            </div>
                            <div>
                                <label className="form-label">Email</label>
                                <input
                                    className="form-control"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {error.email && <p className="text-danger">{error.email[0]}</p>}

                            </div>
                            <div>
                                <label className="form-label">Password</label>
                                <input
                                    className="form-control"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                // src/components/Register.js

                                />
                                {error.password && <p className="text-danger">{error.password[0]}</p>}
                            </div>
                            <div>
                                <label className="form-label">Password Confirmation</label>
                                <input
                                    className="form-control"
                                    type="password"
                                    value={passwordConfirmation}
                                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                                />
                                {error.password_confirmation && <p className="text-danger">{error.password_confirmation[0]}</p>}
                            </div>
                            <button className="btn btn-dark mt-3" type="submit">Register</button>
                        </form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default Register;

