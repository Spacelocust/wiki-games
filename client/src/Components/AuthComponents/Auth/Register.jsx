import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Button from "react-bootstrap/Button";
import { createUseStyles } from 'react-jss';
import { motion } from 'framer-motion';

import ContainerComponent from "../../GeneralComponents/ContainerComponent/ContainerComponent";
import BackButtonComponent from '../../GeneralComponents/Buttons/BackButtonComponent/BackButtonComponent';

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

    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2,
            }
        },
        exit: {
            opacity: 1,
            scale: 0,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2,
            }
        }
    };

    return (
        <ContainerComponent>
            <BackButtonComponent />
            <motion.div
                className='d-flex justify-content-center align-items-center h-100'
                variants={container}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
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
                                <span className="font-secular-uppercase text-medium">Inscrivez-vous sur</span>
                                <span className="text-light font-lemon">WikiGames&#174;</span>
                            </h2>
                            <div className="form-group mb-4">
                                <label htmlFor="email"
                                       className={`font-secular-uppercase text-medium ${classes.labelField}`}>Email</label>
                                <Field name="email" type="email" className={`form-control ${classes.field}`}/>
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="username"
                                       className={`font-secular-uppercase text-medium ${classes.labelField}`}>Pseudonyme</label>
                                <Field name="username" type="text" className={`form-control ${classes.field}`}/>
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="email" className={`font-secular-uppercase text-mediumr ${classes.labelField}`}>mot
                                    de passe</label>
                                <Field name="password" type="password" className={`form-control ${classes.field}`}/>
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="email" className={`font-secular-uppercase text-medium ${classes.labelField}`}>Confirmation
                                    de mot de passe</label>
                                <Field name="password" type="password" className={`form-control ${classes.field}`}/>
                            </div>
                            <Button className={`font-secular-uppercase text-medium ${classes.button}`}>Inscription</Button>
                        </Form>
                    </>)}
                </Formik>
            </motion.div>
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
