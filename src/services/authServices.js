import axios from 'axios';
import jwt_decode from 'jwt-decode';
import httpRequest from '~/utils/httpRequest';

export const signin = async (data = {}) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signin`, data);
        return res.data;
    } catch (error) {
        console.log(error);
        return error.response.data.message;
    }
};

export const forgotPassword = async (data = {}) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/forgot-password`, data);
        return res.data;
    } catch (error) {
        console.log(error);
        return error.response.data.message;
    }
};

export const resetPassword = async (data = {}) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/reset-password`, data);
        return res.data;
    } catch (error) {
        console.log(error);
        return error.response.data.message;
    }
};

export const refresh = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const decodedToken = jwt_decode(refreshToken);
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/refresh/${decodedToken._id}`, {
            token: refreshToken,
        });
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const getCurrUser = async () => {
    try {
        const res = await httpRequest.get('/auth/current-user');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const signOut = async (data = {}) => {
    try {
        const res = await httpRequest.post('/auth/signout', data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
