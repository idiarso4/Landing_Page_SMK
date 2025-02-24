const express = require('express');
const { corsHeaders, csp, cookieSettings } = require('./middleware');

const app = express();
const port = process.env.PORT || 3000;

// Apply CORS headers
app.use((req, res, next) => {
    Object.entries(corsHeaders).forEach(([key, value]) => {
        res.setHeader(key, value);
    });
    next();
});

// Apply security headers
app.use((req, res, next) => {
    Object.entries(csp).forEach(([key, value]) => {
        res.setHeader(key, value);
    });
    next();
});

// Configure cookie settings
app.use((req, res, next) => {
    res.cookie = function(name, value, options) {
        return res.cookie(name, value, { ...options, ...cookieSettings });
    };
    next();
});

// Serve static files
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});