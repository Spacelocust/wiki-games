import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { Formik, Form } from 'formik';
import { createUseStyles } from 'react-jss';
import { motion } from 'framer-motion';

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { signup } from '../../../api/axiosBase';
import AuthReducer from '../Selector/UserSelector';
import ACTION from '../Selector/UserAction';

import ContainerComponent from '../../GeneralComponents/Containers/ContainerComponent/ContainerComponent';
import BackButtonComponent from '../../GeneralComponents/Buttons/BackButton/BackButtonComponent';
import InputControl from '../../GeneralComponents/Inputs/InputControl';

function Register() {
    const [user, setUser] = AuthReducer(ACTION.user);
    const navigate = useNavigate();
    const classes = useStyles();

    useEffect(() => {
        !isEmpty(user) && navigate('/', { replace: true });
    }, [user]);

    return <>
        {isEmpty(user) && <ContainerComponent>
            <motion.div
                className="d-flex justify-content-center align-items-center h-100"
                variants={animatedContainer}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <Formik
                    initialValues={{
                        email: '',
                        username: '',
                        password: '',
                        confirmPassword: ''
                    }}
                    validationSchema={RegisterSchema}
                    onSubmit={async (formData, actions) => {
                        const { confirmPassword, ...rest } = formData;
                        try {
                            const { data } = await signup(rest);
                            setUser(data);
                            sessionStorage.setItem('user', JSON.stringify(data));
                        } catch ({ response }) {
                            actions.setFieldError('email', response.data.message)
                        }
                    }}
                >
                    {({ handleSubmit, errors, touched, isSubmitting }) => (<>
                        <Form onSubmit={handleSubmit} className={classes.form}>
                            <h2 className="d-flex flex-column mb-5">
                                <span className="font-secular-uppercase text-medium">Inscrivez-vous sur</span>
                                <span className="text-light font-lemon">WikiGames&#174;</span>
                            </h2>
                            <div className="form-group mb-4">
                                <InputControl name="email" type="email" label="Email"
                                              placeholder="Veuillez saisir une adresse email.."
                                              errors={errors}
                                              touched={touched}/>
                            </div>
                            <div className="form-group mb-4">
                                <InputControl name="username" label="Pseudonyme"
                                              placeholder="Veuillez saisir un pseudonyme.." errors={errors}
                                              touched={touched}/>
                            </div>
                            <div className="form-group mb-4">
                                <InputControl name="password"
                                              label="Mot de passe"
                                              type="password"
                                              placeholder="Veuillez saisir un mot de passe.." errors={errors}
                                              touched={touched}/>
                            </div>
                            <div className="form-group mb-4">
                                <InputControl name="confirmPassword"
                                              type="password"
                                              label="Confirmation de mot de passe"
                                              placeholder="Veuillez confirmer le mot de passe.."
                                              errors={errors}
                                              touched={touched}/>
                            </div>
                            <BackButtonComponent/>
                            <Button
                                type="submit"
                                className={`font-secular-uppercase text-medium ${classes.button}`}
                                disabled={isSubmitting}>
                                {!isSubmitting ? 'Inscription' :
                                    <Spinner animation="border" variant="light" size="sm"/>}
                            </Button>
                        </Form>
                    </>)}
                </Formik>
            </motion.div>
        </ContainerComponent>}
    </>;
}

const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Address email invalide').required('Veuillez saisir une address email'),
    username: Yup.string()
        .min(5, 'Veuillez saisir un pseudonyme de 5 characters minimum')
        .max(10, 'Veuillez saisir un pseudonyme de 10 characters maximum')
        .required('Veuillez saisir un pseudonyme'),
    password: Yup.string()
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?([^\w\s]|[_])).{8,}$/, {
            message: 'Votre mot de passe doit comporter au moins: ' +
                '8 caractères, ' +
                'un caractère numérique, ' +
                'une lettre majuscule, ' +
                'une lettre minuscule, ' +
                'un caractère spécial',
            excludeEmptyString: true
        })
        .required('Veuillez saisir un mot de passe'),
    confirmPassword: Yup.string()
        .required('Veuillez confirmer le mot de passe')
        .oneOf([Yup.ref('password'), null], 'Veuillez saisir le même mot de passe')
});

const animatedContainer = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
        }
    },
    exit: {
        opacity: 1,
        scale: 0,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
        }
    }
};
const useStyles = createUseStyles({
    form: {
        width: '40%',
        backgroundColor: '#373636A0',
        padding: '2rem'
    },
    button: {
        width: '100%',
        '&:focus': {
            outline: '0px!important',
            boxShadow: 'none!important'
        }
    }
});

export default Register;
