import axios from 'axios';

const baseURL = 'http://localhost:5000';

const API = axios.create({
  baseURL
});

export function withAuth(config = {}) {
  const token = localStorage.getItem('token');
  return {
    ...config,
    headers: {
      ...(config.headers || {}),
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
}

export default API;
