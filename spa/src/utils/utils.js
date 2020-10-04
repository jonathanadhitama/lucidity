import Cookies from 'js-cookie';
import { USER_TOKEN_KEY } from "./constants";
import { decode } from "jsonwebtoken";

//Function that receives the current access token from the cookie
export const getAccessToken = () => {
    return Cookies.get(USER_TOKEN_KEY);
}

/*Function that checks whether a current user has an access token that is not yet expired, then that user is considered
as still logged in. */
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

//Function that sets a cookie with the access token and the expiry token of the access token
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