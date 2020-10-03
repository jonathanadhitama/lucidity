import axios from 'axios';
import {
    LOGIN_URL_API, REGISTER_URL_API, USER_DETAIL_URL_API, LOGOUT_URL_API
} from "../utils/constants";
import { setCookie, getAccessToken } from "../utils/utils";

export const login = ( email, password ) => {
    return new Promise((accept, reject) => {
        axios({
            method: 'post',
            url: LOGIN_URL_API,
            data: { email, password },
            header: { accept: 'application/json' }
        }).then(response => {
            setCookie(response.data.token, Date.parse(response.data.expires_in));
            accept({ success: response.status === 200, message: response.data.message });
        }).catch(error => {
            console.log("Error in Login Service ", error);
            reject({ success: false, message: error.response.data.message });
        });
    });
};

export const register = ( name, email, password, password_confirmation ) => {
    return new Promise((accept, reject) => {
        axios({
            method: 'post',
            url: REGISTER_URL_API,
            data: { name, email, password, password_confirmation },
            header: { accept: 'application/json' }
        }).then(response => {
            setCookie(response.data.token, Date.parse(response.data.expires_in));
            accept({ success: response.status === 200, message: response.data.message });
        }).catch(error => {
            console.log("Error in Register Service ", error);
            reject({ success: false, message: error.response.data.message });
        });
    });
}

export const userDetail = () => {
    return new Promise((accept, reject) => {
        axios({
            method: 'get',
            url: USER_DETAIL_URL_API,
            headers: { accept: 'application/json', Authorization: `Bearer ${getAccessToken()}` }
        }).then(response => {
            accept({ success: true, user: response.data });
        }).catch(error => {
            console.log("Error in User Detail Service ", error);
            reject({ success: false, message: error.response.data.message });
        });
    });
}

export const userLogout = () => {
    return new Promise((accept, reject) => {
        axios({
            method: 'post',
            url: LOGOUT_URL_API,
            headers: { accept: 'application/json', Authorization: `Bearer ${getAccessToken()}` }
        }).then(response => {
            accept({ success: true, message: response.data.message });
        }).catch(error => {
            console.log("Error in User Logout Service ", error);
            reject({ success: false, message: error.response.data.message });
        });
    });
}