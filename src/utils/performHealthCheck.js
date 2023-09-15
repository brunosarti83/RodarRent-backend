const axios = require('axios');

const performHealthCheck = () => {
    axios
    .get(`${process.env.BACKEND_URL}/hc`)
    .then((response) => {
    console.log('Health check response:', response.data);
    })
    .catch((error) => {
    console.error('Health check failed:', error.message);
    });
};

module.exports = performHealthCheck;