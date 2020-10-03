import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import { TextField } from "formik-material-ui";
import {
    ContainerDiv,
    HeaderTitleDiv,
    FieldContainerDiv,
    FormContainerDiv
} from "../../commonStyles";
import Field from "../textfield";
import RegisterButton from "./RegisterButton";
import { HOME_URL } from "../../utils/constants";
import ErrorNotification from "../error/ErrorNotification";
import validationSchema from "./validationSchema";
import { register as registerService } from "../../services/userService";

const TEXT_FIELDS = [
    {name: 'name', label: "NAME", required: true, type: "text"},
    { name: "email", label: "EMAIL ADDRESS", required: true, type: "text" },
    { name: "password", label: "PASSWORD", required: true, type: "password" },
    { name: "password_confirmation", label: "CONFIRM PASSWORD", required: true, type: "password" }
];

const Register = () => {
    const [registerError, setRegisterError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const history = useHistory();

    return (
        <ContainerDiv
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
        >
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: ''
                }}
                onSubmit={async ({ name, email, password, password_confirmation }, {setSubmitting}) => {
                    setSubmitting(true);
                    try {
                        await registerService(name, email, password, password_confirmation);
                        setSubmitting(false);
                        history.push(HOME_URL);
                    } catch (error) {
                        setSubmitting(false);
                        setRegisterError(true);
                        setErrorMessage(error.message)
                    }
                }}
                validationSchema={validationSchema}
            >
                {({ isSubmitting }) => {
                    return (
                        <FormContainerDiv>
                            <HeaderTitleDiv>REGISTER</HeaderTitleDiv>
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
                                    <RegisterButton isSubmitting={isSubmitting} />
                                </FieldContainerDiv>
                            </Form>
                            {registerError && (
                                <ErrorNotification
                                    error={registerError}
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

export default Register;
