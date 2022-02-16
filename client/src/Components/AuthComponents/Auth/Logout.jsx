import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { signout } from '../Selector/AuthSelector';

function Logout() {
    const [, logout] = useRecoilState(signout);
    const navigate = useNavigate();

    useEffect(() => {
        logout({});
        navigate('/', { replace: true });
    }, []);

    return <></>
}

export default Logout;
