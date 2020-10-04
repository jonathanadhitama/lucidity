import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import PrivateRoute from "./components/auth/PrivateRoute";
import Header from "./components/header";
import Login from "./components/login";
import Register from "./components/register";
import Home from './components/home';

import { isLoggedIn } from "./utils/utils";
import styled from "styled-components";
import {HOME_URL, LOGIN_URL, REGISTER_URL} from "./utils/constants";

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

const SectionContainer = styled.div`
    flex: 1;
    width: 100%;
`;

function App() {
  return (
    <Router>
        <AppContainer>
            <Header />
            <SectionContainer>
                <Route path="/" exact>
                    {isLoggedIn()
                        ? <Redirect to={HOME_URL} />
                        : <Redirect to={LOGIN_URL} />
                    }
                </Route>
                <Route path={LOGIN_URL} exact><Login/></Route>
                <Route path={REGISTER_URL} exact><Register/></Route>
                <PrivateRoute path={HOME_URL} exact component={Home} />
            </SectionContainer>
        </AppContainer>
    </Router>
  );
}

export default App;
