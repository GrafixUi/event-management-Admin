import axios from 'axios';

export const axiosAuth = axios.create({
    baseURL: `${process.env.REACT_APP_BACKENDURL}`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})