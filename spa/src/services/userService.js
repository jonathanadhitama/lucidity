import axios from 'axios';
import {
    LOGIN_URL_API, REGISTER_URL_API, USER_DETAIL_URL_API, LOGOUT_URL_API
} from "../utils/constants";
import { setCookie, getAccessToken } from "../utils/utils";

/* Function that calls the Login API.
Once a successful login has been performed, it will set a cookie containing the access token */
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

/* Function that calls the Register API.
Once a successful login has been performed, it will set a cookie containing the access token */
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

/* Function that calls the Get User Detail API. */
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

/* functions that calls the Logout API to invalidate the access token*/
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