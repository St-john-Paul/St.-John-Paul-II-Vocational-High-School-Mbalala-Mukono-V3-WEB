/**
 * Global Configuration for St. John Paul II Website
 * Centralizes API endpoints and asset resolution to simplify deployment.
 */

const isProduction = !window.location.hostname.includes('localhost') &&
    !window.location.hostname.includes('127.0.0.1') &&
    !window.location.hostname.startsWith('192.168.');

// Derived base URL for local development to support any local IP/hostname
const localProtocol = window.location.protocol;
const localHostname = window.location.hostname;
const DEV_API_URL = `${localProtocol}//${localHostname}:5000`;
const PROD_API_URL = window.location.origin;

export const BASE_URL = isProduction ? PROD_API_URL : DEV_API_URL;
export const API_URL = `${BASE_URL}/api`;

/**
 * Utility to ensure image URLs are absolute and point to the correct server.
 * @param {string} path - The relative or absolute image path.
 * @returns {string} - The corrected image URL.
 */
export const getImageUrl = (path) => {
    if (!path) return '/hero-main.png';
    if (path.startsWith('http')) return path;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${BASE_URL}${cleanPath}`;
};
