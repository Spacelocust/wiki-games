import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from "recoil";

import { isAuthent } from "../Selector/AuthSelector";

function Guard({ children }) {
    const isLogged = useRecoilValue(isAuthent);
    const navigate = useNavigate();

    useEffect(() => {
        isLogged && navigate('/auth', { replace: true });
    }, []);

    return (
        <>
            { !isLogged && children }
        </>
    );
}

export default Guard;