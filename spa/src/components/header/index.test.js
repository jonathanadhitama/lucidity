import React from "react";
import Header from "./index";
import { Link, MemoryRouter } from 'react-router-dom';
import { mount } from "enzyme";
import {HOME_URL, LOGIN_URL, REGISTER_URL} from "../../utils/constants";


describe('HeaderComponent', function () {
    test('renders correctly', function () {
        const wrap = mount(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        const links = wrap.find(Link);

        //There should be 3
        expect(links.length).toEqual(3);

        //Check first link contains URL to login
        expect(links.at(0).props().to).toEqual(LOGIN_URL);

        //Check second link contains URL to register
        expect(links.at(1).props().to).toEqual(REGISTER_URL);

        //Check third link contains URL to home
        expect(links.at(2).props().to).toEqual(HOME_URL);

        const aElements = wrap.find('a');

        //Expect first link contains text LOGIN PAGE
        expect(aElements.at(0).text()).toEqual('LOGIN PAGE')

        //Expect second link contains text REGISTER PAGE
        expect(aElements.at(1).text()).toEqual('REGISTER PAGE')

        //Expect third link contains text HOME PAGE
        expect(aElements.at(2).text()).toEqual('HOME PAGE')
    });
});
