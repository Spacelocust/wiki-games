import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthReducer from '../Selector/UserSelector';
import ACTION from '../Selector/UserAction';

function Logout() {
    const [setUser] = AuthReducer(ACTION.setUser);
    const navigate = useNavigate();

    useEffect(() => {
        setUser({})
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        navigate('/', { replace: true });
    }, []);

    return <></>
}

export default Logout;
