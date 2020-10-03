import Login from "./index";
import { mount } from "enzyme";
import React from "react";
import { Field } from "formik";
import { Button, TextField } from "@material-ui/core";
import { login as loginService } from "../../services/userService";
import {act} from "@testing-library/react";
import {HOME_URL} from "../../utils/constants";

const mockHistoryPush = jest.fn();
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

    test('renders correctly', () => {
        const wrap = mount(<Login />);

        const textFields = wrap.find(Field);

        //There should be 2 fields (email & password)
        expect(textFields.length).toEqual(2);

        //Expect first field to be email
        expect(textFields.at(0).props().name).toEqual('email');

        //Expect second field to be password
        expect(textFields.at(1).props().name).toEqual('password');

        //Expect to have a button
        expect(wrap.find(Button).length).toEqual(1);

        // console.log(wrap.debug());

        // console.log(textFields.get(0));
    });

    test('behaves correctly when successful login', async () => {
        const mockLoginService = jest.fn();
        loginService.mockImplementation(mockLoginService);

        const wrap = mount(<Login />);

        const textFields = wrap.find(TextField);

        await act(async () => {
            /* fire events that update state */

            //Change text field value for email and password
            textFields.findWhere(it => it.props().name === 'email').first().props().onChange({ type: 'change', target: { name: 'email', value: 'test@mail.com' } });
            textFields.findWhere(it => it.props().name === 'password').first().props().onChange({ type: 'change', target: { name: 'password', value: 'test1234' } });

            //Wait for update
            await new Promise(resolve => setTimeout(resolve));

            //Find <form> element to trigger submission because trigger login button not working
            const formElement = wrap.find("form");
            formElement.props().onSubmit();

            await new Promise(resolve => setTimeout(resolve));
        });

        wrap.update();

        expect(mockLoginService).toHaveBeenCalledWith('test@mail.com', 'test1234');

        expect(mockHistoryPush).toHaveBeenCalledWith(HOME_URL);

    });
});