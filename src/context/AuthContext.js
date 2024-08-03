// src/context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import { getUser, logout as logoutService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser().then(response => {
            console.log(response);
            setUser(response.data);
        }).catch(() => {
            setUser(null);
        });
    }, []);

    const logout = async () => {
        await logoutService();
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
