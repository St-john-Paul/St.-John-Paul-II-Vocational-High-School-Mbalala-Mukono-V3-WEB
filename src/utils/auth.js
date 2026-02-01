import { API_URL } from '../config.js';

export const login = async (username, password) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Login failed');

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data;
    } catch (error) {
        console.error('Login Error:', error);
        throw error;
    }
};

export const logout = () => {
    // Redirect to logout confirmation page
    window.location.href = '/logout.html';
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    // Basic check - in real app, verify expiry or validate with backend
    return !!token;
};
