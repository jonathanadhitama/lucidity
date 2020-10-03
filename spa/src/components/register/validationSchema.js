import * as Yup from "yup";

export default Yup.object().shape({
    name: Yup.string().required("Required."),
    email: Yup.string().required("Required."),
    password: Yup.string().required("Required."),
    password_confirmation: Yup.string().required("Required.")
});
