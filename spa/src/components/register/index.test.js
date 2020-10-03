import Register from "./index";
import { mount } from "enzyme";
import React from "react";
import { Field } from "formik";
import { Button, TextField } from "@material-ui/core";
import { register as registerService } from "../../services/userService";
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


describe('Register', function () {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders correctly', () => {
        const wrap = mount(<Register />);

        const textFields = wrap.find(Field);

        //There should be 4 fields (name, email, password, & password_confirmation)
        expect(textFields.length).toEqual(4);

        //Expect first field to be email
        expect(textFields.at(0).props().name).toEqual('name');

        //Expect second field to be password
        expect(textFields.at(1).props().name).toEqual('email');

        //Expect third field to be email
        expect(textFields.at(2).props().name).toEqual('password');

        //Expect fourth field to be password
        expect(textFields.at(3).props().name).toEqual('password_confirmation');

        //Expect to have a button
        expect(wrap.find(Button).length).toEqual(1);
    });

    test('behaves correctly when successful register', async () => {
        const mockRegisterService = jest.fn();
        registerService.mockImplementation(mockRegisterService);

        const wrap = mount(<Register />);

        const textFields = wrap.find(TextField);

        await act(async () => {
            /* fire events that update state */

            //Change text field value for email and password
            textFields.findWhere(it => it.props().name === 'name').first().props().onChange({ type: 'change', target: { name: 'name', value: 'tester' } });
            textFields.findWhere(it => it.props().name === 'email').first().props().onChange({ type: 'change', target: { name: 'email', value: 'test@mail.com' } });
            textFields.findWhere(it => it.props().name === 'password').first().props().onChange({ type: 'change', target: { name: 'password', value: 'test1234' } });
            textFields.findWhere(it => it.props().name === 'password_confirmation').first().props().onChange({ type: 'change', target: { name: 'password_confirmation', value: 'test1234' } });

            //Wait for update
            await new Promise(resolve => setTimeout(resolve));

            //Find <form> element to trigger submission because trigger login button not working
            const formElement = wrap.find("form");
            formElement.props().onSubmit();

            await new Promise(resolve => setTimeout(resolve));
        });

        wrap.update();

        expect(mockRegisterService).toHaveBeenCalledWith('tester', 'test@mail.com', 'test1234', 'test1234');

        expect(mockHistoryPush).toHaveBeenCalledWith(HOME_URL);
    });
});