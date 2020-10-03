import React from 'react';
import {  Button } from "@material-ui/core";

export default ({ onClick }) => (
    <Button
        style={{
            color: "red",
            backgroundColor: "white",
            border: "2px solid red",
            borderRadius: "5px",
            fontSize: "20pt"
        }}
        onClick={onClick}
        color="secondary"
        fullWidth={true}
    >
        LOGOUT
    </Button>
);