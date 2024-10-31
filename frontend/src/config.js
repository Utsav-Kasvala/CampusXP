// config.js
//export const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api/v1'; // Adjust based on your environment
// src/config.js
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

export const token = localStorage.getItem('token');