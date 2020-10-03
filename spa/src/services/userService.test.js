import axios from 'axios';
import Cookie from 'js-cookie';
import { login, register, userDetail, userLogout } from './userService';
import { USER_TOKEN_KEY } from "../utils/constants";

jest.mock('axios');
jest.mock('js-cookie');

const loginResponse = {
    message: 'success',
    token: 'sample_token',
    expires_in: '2020-10-04T06:24:25.375939Z'
};

const userDetailResponse = {
    id: 1,
    name: 'test',
    email: 'jonathan@mailinator.com'
};

describe('UserService', function () {
    it('Sets the correct cookie after successful login', async () => {
        const mockCookieSet = jest.fn();
        Cookie.set.mockImplementation(mockCookieSet)
        axios.mockImplementationOnce(() => Promise.resolve({ data: { ...loginResponse }}));

        await login('test@mail.com', 'test1234');

        const expires = new Date(loginResponse.expires_in).valueOf();
        expect(mockCookieSet).toHaveBeenCalledWith(USER_TOKEN_KEY, loginResponse.token, { path: "/", expires });
    });

    it('Sets the correct cookie after successful register', async () => {
        const mockCookieSet = jest.fn();
        Cookie.set.mockImplementation(mockCookieSet)
        axios.mockImplementationOnce(() => Promise.resolve({ data: { ...loginResponse }}));

        await register('test', 'test@mail.com', 'test1234', 'test1234');
        const expires = new Date(loginResponse.expires_in).valueOf();
        expect(mockCookieSet).toHaveBeenCalledWith(USER_TOKEN_KEY, loginResponse.token, { path: "/", expires });
    });

    it('Gets the authorisation token when attempting to get user details', async () => {
        const mockCookieGet = jest.fn();
        Cookie.get.mockImplementation(mockCookieGet)
        axios.mockImplementationOnce(() => Promise.resolve({ data: { ...userDetailResponse }}));

        await userDetail();
        expect(mockCookieGet).toHaveBeenCalledWith(USER_TOKEN_KEY);
    });

    it('Gets the authorisation token when attempting to logout', async () => {
        const mockCookieGet = jest.fn();
        Cookie.get.mockImplementation(mockCookieGet)
        axios.mockImplementationOnce(() => Promise.resolve({ data: { message: 'success' }}));

        await userLogout();
        expect(mockCookieGet).toHaveBeenCalledWith(USER_TOKEN_KEY);
    });
});
