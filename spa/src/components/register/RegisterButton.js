import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const buttonStyles = () => ({
    loginButton: {
        color: "#2699FB",
        backgroundColor: "white",
        border: "2px solid #2699FB",
        width: "100%",
        fontSize: "20px",
        fontWeight: 600,
        padding: "10px 0"
    }
});

const RegisterButton = ({ classes, isSubmitting }) => (
    <Button
        variant="outlined"
        type="submit"
        className={classes.loginButton}
        disabled={isSubmitting}
    >
        REGISTER
    </Button>
);

export default withStyles(buttonStyles)(RegisterButton);
