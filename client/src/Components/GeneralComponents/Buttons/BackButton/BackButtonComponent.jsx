import React from 'react';
import { FontAwesomeIcon as IconSetter } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

function BackButtonComponent({ route, previousOn = false }) {
    const navigate = useNavigate();
    const location = useLocation();

    const back = () => {
        let url = location.pathname.split('/');
        url = url.slice(0, url.length - 1).join('/');

        navigate(previousOn ? -1 : `${ !route ? (isEmpty(url) ? '/' : url) : route }`);
    };

    return <Button className="btn btn-secondary my-2 font-secular-uppercase" onClick={() => back()}><IconSetter icon={faArrowLeft}
                                                                                    className="mx-2"/> Retour</Button>;
}

export default BackButtonComponent;
