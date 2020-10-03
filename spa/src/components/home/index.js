import React, { useState, useEffect } from 'react';
import { ContainerDiv } from "../../commonStyles";
import LogoutButton from "./LogoutButton";
import { userDetail as userDetailService, userLogout as userLogoutService } from "../../services/userService";
import ErrorNotification from "../error/ErrorNotification";
import styled from "styled-components";
import UserDetailCard from "./UserDetailCard";
import Cookies from 'js-cookie';
import {HOME_URL, USER_TOKEN_KEY} from '../../utils/constants';

const UserDetailContainer = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;
`;


const Home = ({ history }) => {
    const [detailError, setDetailError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        userDetailService()
            .then(({ user }) => {
                setUserData(user)
            })
            .catch(({ message }) => {
                setDetailError(true);
                setErrorMessage(message);
            })
    }, []);

    const handleLogout = async () => {
        try {
            await userLogoutService();
            Cookies.remove(USER_TOKEN_KEY);
            history.push("/");
        } catch (error) {
            setDetailError(true);
            setErrorMessage(error.message);
        }
    };

    return (
        <ContainerDiv
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            {!userData ? (
                <UserDetailContainer>
                    LOADING...
                </UserDetailContainer>
            ) : (
                <React.Fragment>
                    <UserDetailContainer>
                        <UserDetailCard
                            id={userData.id}
                            name={userData.name}
                            email={userData.email}
                        />
                    </UserDetailContainer>
                    <UserDetailContainer>
                        <LogoutButton onClick={handleLogout} />
                    </UserDetailContainer>
                </React.Fragment>
            )}
            {detailError && (
                <ErrorNotification
                    error={detailError}
                    message={errorMessage}
                />
            )}
        </ContainerDiv>
    );
}

export default Home;