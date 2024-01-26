import React from 'react';
import {useField} from "formik";

function CustomInput({label, ...props}) {
    const [field, meta] = useField(props)

    console.log(field)
    console.log(meta)
    return (
        <>
            <label>{label}</label>
            <input
                {...meta}
                {...field}
            />
        </>
    );
}

export default CustomInput;