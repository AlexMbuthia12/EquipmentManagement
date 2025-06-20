import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:7000', // Adjust if using a different port
  withCredentials: true, // ✅ Enables sending cookies with requests
});

export default instance;
