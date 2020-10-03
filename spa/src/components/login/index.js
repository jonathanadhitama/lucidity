import React, { useState } from "react";
import { Formik, Form } from "formik";
import { TextField } from "formik-material-ui";
import {
    ContainerDiv,
    HeaderTitleDiv,
    FieldContainerDiv,
    FormContainerDiv
} from "../../commonStyles";
import Field from "../textfield";
import LoginButton from "./LoginButton";
import { HOME_URL } from "../../utils/constants";
import ErrorNotification from "../error/ErrorNotification";
import validationSchema from "./validationSchema";
import { login as loginService } from "../../services/userService";

const TEXT_FIELDS = [
    { name: "email", label: "EMAIL ADDRESS", required: true, type: "text" },
    { name: "password", label: "PASSWORD", required: true, type: "password" }
];

const Login = ({ history }) => {
    const [loginError, setLoginError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    return (
        <ContainerDiv
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
        >
            <Formik
                initialValues={{
                    password: '',
                    email: '',
                }}
                onSubmit={async ({email, password}, {setSubmitting}) => {
                    setSubmitting(true);
                    try {
                        await loginService(email, password);
                        setSubmitting(false);
                        history.push(HOME_URL);
                    } catch (error) {
                        setSubmitting(false);
                        setLoginError(true);
                        setErrorMessage(error.message)
                    }
                }}
                validationSchema={validationSchema}
            >
                {({ isSubmitting }) => {
                    return (
                        <FormContainerDiv>
                            <HeaderTitleDiv>LOGIN</HeaderTitleDiv>
                            <Form>
                                {TEXT_FIELDS.map(
                                    (
                                        { name, required, type, label },
                                        index
                                    ) => (
                                        <FieldContainerDiv key={index}>
                                            <Field
                                                component={TextField}
                                                name={name}
                                                required={required}
                                                type={type}
                                                label={label}
                                            />
                                        </FieldContainerDiv>
                                    )
                                )}
                                <FieldContainerDiv>
                                    <LoginButton isSubmitting={isSubmitting} />
                                </FieldContainerDiv>
                            </Form>
                            {loginError && (
                                <ErrorNotification
                                    error={loginError}
                                    message={errorMessage}
                                />
                            )}
                        </FormContainerDiv>
                    );
                }}
            </Formik>
        </ContainerDiv>
    );
};

export default Login;
