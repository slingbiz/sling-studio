import axios from './ApiConfig';

const MockAdapter = require('axios-mock-adapter');

export default new MockAdapter(axios, {delayResponse: 200});
