import axios from './ApiConfig';
console.log(axios, 'axiosaxiosaxios')
const MockAdapter = require('axios-mock-adapter');

export default new MockAdapter(axios, {delayResponse: 0});
