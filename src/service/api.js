import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apisaurussegmentos.azurewebsites.net/api/',
});

export default api;