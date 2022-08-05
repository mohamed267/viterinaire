import axios from 'axios';
const axiosServices = axios.create({ baseURL: 'http://api.dzcreatech.com/v1' });
// const axiosServices = axios.create({ baseURL: 'http://localhost:5000/v1' });
axiosServices.defaults.headers.common['Content-Type'] = 'multipart/form-data';

axiosServices.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axiosServices.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject( (error.response &&
        error.response.data &&
        error.response.data.message) ||
    error.message ||
    error.toString() || 'Wrong Services')
);

export default axiosServices;
