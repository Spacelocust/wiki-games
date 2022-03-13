import React, { useEffect, useState } from 'react';
import { Field } from 'formik';
import Alert from 'react-bootstrap/Alert';
import { createUseStyles } from 'react-jss';
import { FontAwesomeIcon as IconSetter } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function InputControl({ name, type = 'text', label, placeholder, errors, touched }) {
    const [showPassword, setShowPassword] = useState(false);
    const classes = useStyles();

    return <>
        <label htmlFor={name} className="font-secular-uppercase text-medium text-white">{label}</label>
        <Field name={name} type={type === 'password' ? (!showPassword ? type : 'text') : type}
               className={`form-control ${classes.field}`} placeholder={placeholder}/>
        {type === 'password' ?
            <IconSetter icon={!showPassword ? faEye : faEyeSlash} className={`mx-2 ${classes.iconField}`}
                        onClick={() => setShowPassword(!showPassword)}/> : null}
        {errors[name] && touched[name] ? (
            <Alert variant="danger" className={classes.errors}>{errors[name]}</Alert>) : null}
    </>;
}

const useStyles = createUseStyles({
    field: {
        color: '#fff',
        backgroundColor: '#373636',
        border: 'unset',
        '&:focus': {
            color: '#fff',
            outline: '0px!important',
            boxShadow: 'none!important',
            backgroundColor: '#414040',
            transition: 'backgroundcolor 2s ease-in-out'
        }
    },
    iconField: {
        color: '#fff',
        marginLeft: '-25px !important',
        marginTop: '-25px',
        position: 'relative',
        zIndex: 2,
        float: 'right',
        cursor: 'pointer'
    },
    errors: {
        margin: '0.5rem 0',
        fontSize: '.8rem!important'
    }
})

export default InputControl;
