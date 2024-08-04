// src/services/authService.js

import axios from './../config/axios';

const API_URL = 'http://localhost:8000/api';

export const register = (name, email, password, password_confirmation) => {
    return axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
        password_confirmation,
    });
};

export const login = (email, password) => {
    return axios.post(`${API_URL}/login`, {
        email,
        password,
    });
};

export const logout = () => {
    return axios.post(`${API_URL}/logout`);
};

export const getUser = async () => {
    return await axios.get(`${API_URL}/user`);
};
