import Home from "./index";
import UserDetailCard from "./UserDetailCard";
import { mount } from "enzyme";
import React from "react";
import { Button } from "@material-ui/core";
import {
    userDetail as userDetailService,
    userLogout as userLogoutService
} from "../../services/userService";
import {act} from "@testing-library/react";

const mockHistoryPush = jest.fn();

const userDetailServiceMock = jest.fn( async () => (
    {
        success: true,
        user: {
            id: 1, name: 'test', email: 'test@mail.com'
        }
    }
));

jest.mock("../../services/userService");
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));


describe('LoginComponent', function () {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders correctly', async () => {
        userDetailService.mockImplementation(userDetailServiceMock);

        const wrap = mount(<Home />);

        await act(async () => {
            //Wait for update
            await new Promise(resolve => setTimeout(resolve))
        });

        wrap.update();

        const card = wrap.find(UserDetailCard);

        //There should be 1 Card
        expect(card.length).toEqual(1);

        //Check user detail card props
        expect(card.props().id).toEqual(1);

        expect(card.props().name).toEqual('test');

        expect(card.props().email).toEqual('test@mail.com');

        //Expect to have a button
        expect(wrap.find(Button).length).toEqual(1);
    });

    test('redirects to login page after logout', async () => {

        const userLogoutServiceMock = jest.fn(async () => (
            { message: 'success' }
        ));
        userDetailService.mockImplementation(userDetailServiceMock);
        userLogoutService.mockImplementation(userLogoutServiceMock);

        const wrap = mount(<Home />);


        await act(async () => {
            //Wait for update
            await new Promise(resolve => setTimeout(resolve))
        });

        wrap.update();

        //Simulate button click
        await act(async () => {
            const button = wrap.find(Button);
            button.simulate('click');
            //Wait for update
            await new Promise(resolve => setTimeout(resolve))
        });

        expect(userLogoutServiceMock).toHaveBeenCalled();
        expect(mockHistoryPush).toHaveBeenCalledWith("/");
    });
});