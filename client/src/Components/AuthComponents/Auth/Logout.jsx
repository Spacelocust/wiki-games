import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Signout } from '../Selector/UserSelector';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        Signout();
        navigate('/', { replace: true });
    }, []);

    return <></>
}

export default Logout;
