import axios from './../config/axios';

const API_URL = 'http://localhost:8000/api';


export const getJobTypes = async () => {
    return await axios.get('/job-type-index');
};

export const getCategory = async () => {
    return await axios.get('/category-index');
};
