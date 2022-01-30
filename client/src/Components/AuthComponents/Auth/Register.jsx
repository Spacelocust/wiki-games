import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Button from "react-bootstrap/Button";
import { createUseStyles } from 'react-jss';

import ContainerComponent from "../../GeneralComponents/ContainerComponent/ContainerComponent";

const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});

function Register() {
    const classes = useStyles();

    return (
        <ContainerComponent>
            <div className='d-flex justify-content-center align-items-center h-100'>
                <Formik
                    initialValues={{
                        email: '',
                        username: '',
                        password: '',
                        passwordConfirm: '',
                    }}
                    onSubmit={values => {
                        console.log(values);
                    }}
                >
                    {formik => (<>
                        <Form onSubmit={formik.handleSubmit} className={classes.form}>
                            <h2 className="d-flex flex-column mb-5">
                                <span className="font-secular text-uppercase">Inscrivez-vous sur</span>
                                <span className="text-light font-lemon">WikiGames&#174;</span>
                            </h2>
                            <div className="form-group mb-4">
                                <label htmlFor="email"
                                       className={`text-uppercase font-secular ${classes.labelField}`}>Email</label>
                                <Field name="email" type="email" className={`form-control ${classes.field}`}/>
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="username"
                                       className={`text-uppercase font-secular ${classes.labelField}`}>Pseudonyme</label>
                                <Field name="username" type="text" className={`form-control ${classes.field}`}/>
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="email" className={`text-uppercase font-secular ${classes.labelField}`}>mot
                                    de passe</label>
                                <Field name="password" type="password" className={`form-control ${classes.field}`}/>
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="email" className={`text-uppercase font-secular ${classes.labelField}`}>Confirmation
                                    de mot de passe</label>
                                <Field name="password" type="password" className={`form-control ${classes.field}`}/>
                            </div>
                            <Button className={`${classes.button} text-uppercase font-secular`}>Inscription</Button>
                        </Form>
                    </>)}
                </Formik>
            </div>
        </ContainerComponent>
    );
}

const useStyles = createUseStyles({
    form: {
        backgroundColor: 'rgba(55,54,54,0.63)',
        padding: '2rem',
    },
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
        fontSize: '1.2rem',
        color: '#fff',
    },
    button: {
        width: '100%',
        '&:focus': {
            outline: '0px!important',
            boxShadow: 'none!important',
        },
    },
});

export default Register;