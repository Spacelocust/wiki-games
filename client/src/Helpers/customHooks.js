import { useCallback } from 'react';
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
            console.log(e)
        }
    }

    const execute = useCallback(() => {
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

    return { execute };
}
