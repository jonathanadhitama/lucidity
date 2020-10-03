import React from 'react';
import Home from "../home";
import { Redirect, MemoryRouter } from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";
import { isLoggedIn } from "../../utils/utils";
import { mount } from "enzyme";
const mockProps = {
    location: { pathname: '/home', search: '', hash: '', state: undefined, key: '1'}
};

jest.mock("../../utils/utils");

describe('HeaderComponent', function () {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Renders <Home /> correctly when user is logged in', function () {
        const successLoginMockup = jest.fn( () => true );
        isLoggedIn.mockImplementation(successLoginMockup);

        const wrap = mount(
            <MemoryRouter>
                <PrivateRoute {...mockProps} component={Home} />
            </MemoryRouter>
        );

        expect(successLoginMockup).toHaveBeenCalled();

        //Expect to render Home Component
        const home = wrap.find(Home);
        expect(home.exists()).toBe(true);
    });
    test('Renders correctly when user is not logged in', function () {
        const failureLoginMockup = jest.fn( () => false );
        isLoggedIn.mockImplementation(failureLoginMockup);

        const wrap = mount(
            <MemoryRouter>
                <PrivateRoute {...mockProps} component={Home} />
            </MemoryRouter>
        );

        expect(failureLoginMockup).toHaveBeenCalled();

        //Expect to render a Redirect Component
        const redirect = wrap.find(Redirect);
        expect(redirect.exists()).toBe(true);
    });
});