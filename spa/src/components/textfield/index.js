import React from "react";
import { Field as FormikField } from "formik";
import { TextField } from "formik-material-ui";

export default ({ name, required, type, label }) => (
    <FormikField
        name={name}
        label={label}
        required={required}
        type={type}
        component={TextField}
        variant="outlined"
        fullWidth={true}
    />
);