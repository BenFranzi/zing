const config = {
    apiEndpont: '/api/v1',
    wsEndpont: 'https://jsonplaceholder.typicode.com/' //'http://localhost:3001/',
};

if (process.env.NODE_ENV === 'development') {
    config.apiEndpont = 'https://jsonplaceholder.typicode.com/' //'http://localhost:3001/api/v1';
}

export default config;
