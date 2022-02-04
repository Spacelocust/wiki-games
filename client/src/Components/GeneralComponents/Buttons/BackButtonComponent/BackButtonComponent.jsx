import React from 'react';
import { FontAwesomeIcon as IconSetter } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import { useNavigate, useLocation } from 'react-router-dom';

function BackButtonComponent() {
    const navigate = useNavigate();
    const location = useLocation();
    const back = () => {
        let url = location.pathname.split('/');
        navigate(`${url.slice(0, url.length - 1).join('/')}`);
    };

    return <Button className="btn btn-secondary" onClick={() => back()}><IconSetter icon={faArrowLeft} className="mx-2"/> Retour</Button>;
}

export default BackButtonComponent;
