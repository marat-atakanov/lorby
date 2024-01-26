import * as yup from "yup"

const passwordRegExp = /^(?=.*[0-9])(?=.*[!@#$%^"*])(?=.*[a-zA-Z]).{8,}$/
export const registrationSchema = yup.object().shape({
    email: yup.string().email().required("Required"),
    username: yup.string().min(3, "Username must contain more than 3 characters").required("Required"),
    password: yup
        .string()
        .matches(passwordRegExp, {message: "No matches"})
        .max(15, "Max of 15 characters")
        .min(8, "Min of 8 characters")
        .required("Required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Пароли не совпадают")
        .required("")
})