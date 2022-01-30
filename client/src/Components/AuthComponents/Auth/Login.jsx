import React from 'react';
import { Formik, Form, Field } from 'formik';
import Button from "react-bootstrap/Button";
import { createUseStyles } from 'react-jss';

function Login() {
    const classes = useStyles();

    return (
        <div>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                onSubmit={values => {
                    console.log(values);
                }}
            >
                {formik => (
                    <Form onSubmit={formik.handleSubmit}>
                        <div className="form-group mb-4">
                            <label htmlFor="email" className={`text-uppercase font-secular ${classes.labelField}`}>Email</label>
                            <Field name="email" type="email" className={`form-control ${classes.field}`}/>
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="email" className={`text-uppercase font-secular ${classes.labelField}`}>mot de passe</label>
                            <Field name="password" type="password" className={`form-control ${classes.field}`}/>
                        </div>
                        <div className="form-check mb-4">
                            <Field type="checkbox" name="checked" className="form-check-input"/>
                            <label htmlFor="checked" className={`${classes.labelCheckbox} form-check-label`}>Se souvenir ?</label>
                        </div>
                        <Button className={`${classes.button} text-uppercase font-secular`}>Connexion</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
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
    labelField: {
        fontSize: '1.5rem',
        color: '#fff',
    },
    button: {
        width: '100%',
        '&:focus': {
            outline: '0px!important',
            boxShadow: 'none!important',
        },
    },
    checkbox: {
        backgroundColor: '#373636 !important',
        border: 'unset',
        '&:checked': {
            outline: '0px!important',
            boxShadow: 'none!important',
            backgroundColor: '#414040',
            transition: 'backgroundcolor 2s ease-in-out'
        }
    },
    labelCheckbox: {
        fontSize: '0.9rem',
        color: '#fff',
    },
});

export default Login;