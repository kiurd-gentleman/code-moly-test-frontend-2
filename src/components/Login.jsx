// src/components/Login.js

import React, {useState, useContext} from 'react';
import {login} from '../services/authService';
import {AuthContext} from '../context/AuthContext';
import {useNavigate} from 'react-router-dom';
import {Card} from "react-bootstrap";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password).then(response => {
            localStorage.setItem('token', response.data.token);
            setUser(response.data.user);
            navigate('/dashboard');
        }).catch(error => {
            console.error('Login error', error);
        });
    };

    return (
        <div className="container mx-auto">
            <div className="mt-5 w-50 mx-auto">
                <Card className="border-0 mt-5" style={{backgroundColor: 'rgb(237 237 237)'}}>
                    <Card.Body>
                        <Card.Title className="text-center">Signup to your Account</Card.Title>
                        {/*<h2>Login</h2>*/}
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className="form-label">Email</label>
                                <input
                                    className="form-control"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="form-label">Password</label>
                                <input
                                    className="form-control"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-dark mt-3" type="submit">Login</button>
                            {/*//if you have an account then login*/}
                            <p className="mt-4 float-end">If you have an account then
                                <a href="/register"> Register</a>
                            </p>
                        </form>
                    </Card.Body>
                </Card>

            </div>
        </div>
    );
}

export default Login;
