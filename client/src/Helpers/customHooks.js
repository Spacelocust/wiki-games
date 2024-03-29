import { toast } from 'react-toastify';
import { useCallback, useLayoutEffect, useRef } from 'react';
import { isNull } from 'lodash';

import { getUserByToken, refreshToken } from '../api/axiosBase';
import AuthReducer from '../Components/AuthComponents/Selector/UserSelector';
import ACTION from '../Components/AuthComponents/Selector/UserAction';

export const CheckUserExists = () => {
    const [setUser] = AuthReducer(ACTION.setUser);

    const refresh = async (value, remember) => {
        try {
            const { data } = await refreshToken(value);
            setUser(data);
            remember && localStorage.setItem('user', JSON.stringify(data));
            sessionStorage.setItem('user', JSON.stringify(data));
        } catch (e) {
            Notif('Error: Session expirée, veuillez-vous reconnecter', 'error', 'bottom-right');
        }
    }

    const checkUser = useCallback(() => {
        return (async () => {
            let user = null;
            let remember = false;
            if (localStorage.getItem('user')) {
                user = JSON.parse(localStorage.getItem('user'));
                remember = true;
            } else {
                if (sessionStorage.getItem('user')) {
                    user = JSON.parse(sessionStorage.getItem('user'));
                }
            }
            if (!isNull(user)) {
                try {
                    const { data: userByToken } = await getUserByToken(user);
                    setUser(userByToken);
                } catch ({ response }) {
                    if (response.data.name === 'TokenExpiredError') {
                        await refresh(user, remember);
                    }
                }
            }
        })();
    }, []);

    return [ checkUser ];
}

export const Notif = (message, type = 'success', position = 'top-right') => {
    toast[type](message, {
        position,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });
}

export const useFirstEffect = (effect, deps) => {
    const firstUpdate = useRef(true);
    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        effect();
    }, deps);
}
