import React from 'react';
import { Formik, Form, Field } from 'formik';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { createUseStyles } from 'react-jss';

import InputControl from '../../GeneralComponents/Inputs/InputControl';
import axios from 'axios';

function Login() {
    const classes = useStyles();

    return (
        <div>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                onSubmit={async (formData, actions) => {
                    try {
                        const { data } = await axios.post('/login', formData);
                        console.log(data);
                    } catch (e) {
                        actions.setFieldError('password', 'Erreur: Email ou mot de passe incorrect');
                    }
                }}
            >
                {({ handleSubmit, errors, touched, isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>
                        <div className="form-group mb-4">
                            <InputControl name="email" type="email" label="Email"
                                          placeholder="Veuillez saisir votre adresse email"
                                          errors={errors}
                                          touched={touched}
                            />
                        </div>
                        <div className="form-group mb-4">
                            <InputControl name="password" type="password" label="Mot de passe"
                                          placeholder="Veuillez saisir votre mot de passe"
                                          errors={errors}
                                          touched={touched}
                            />
                        </div>
                        <div className="form-check mb-4">
                            <Field type="checkbox" name="checked" className="form-check-input"/>
                            <label htmlFor="checked" className={`form-check-label ${classes.labelCheckbox}`}>Se souvenir
                                ?</label>
                        </div>
                        <Button type="submit" className={`${classes.button} text-uppercase font-secular`}
                                disabled={isSubmitting}>{!isSubmitting ? 'Connexion' :
                            <Spinner animation="border" variant="light" size="sm"/>}</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

const useStyles = createUseStyles({
    button: {
        width: '100%',
        '&:focus': {
            outline: '0px!important',
            boxShadow: 'none!important'
        }
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
        color: '#fff'
    }
});

export default Login;
