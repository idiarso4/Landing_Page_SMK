// CORS and Security Headers Middleware

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true'
};

// Content Security Policy
const csp = {
    'Content-Security-Policy': "default-src 'self'; img-src 'self' https: data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; trusted-types 'none';",
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
};

// Cookie settings
const cookieSettings = {
    sameSite: 'Strict',
    secure: true,
    httpOnly: true
};

module.exports = {
    corsHeaders,
    csp,
    cookieSettings
};