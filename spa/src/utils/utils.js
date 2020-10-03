import Cookies from 'js-cookie';
import { USER_TOKEN_KEY } from "./constants";
import { decode } from "jsonwebtoken";

export const getAccessToken = () => {
    return Cookies.get(USER_TOKEN_KEY);
}

export const isLoggedIn = () => {
    const accessToken = Cookies.get(USER_TOKEN_KEY);
    if (accessToken && accessToken.length > 0) {
        const decodedToken = decode(accessToken);
        console.log(decodedToken);
        //Ensure token is not expired (exp attribute is in seconds, multiply by 1000 to milliseconds)
        return decodedToken.exp * 1000 > new Date().getTime();
    } else {
        return false;
    }
};

export const setCookie = (token, expireDate) => {
    Cookies.set(USER_TOKEN_KEY, token, {
        path: "/",
        expires: expireDate,
        //TODO: Fill in these attributes on deployment to production version
        //secure: true
        // httpOnly: true,
        // sameSite: true
    });
}