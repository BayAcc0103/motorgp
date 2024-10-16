// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const getlogin = (user) => {
        setUser(user.user);
        setAuthenticated(true);
        localStorage.setItem('token', user.token); // Optionally store token
    };

    const logout = () => {
        setUser(null);
        setAuthenticated(false);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, getlogin, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
