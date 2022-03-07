import { refreshToken } from '../api/axiosBase';
import AuthReducer from '../Components/AuthComponents/Selector/UserSelector';
import ACTION from '../Components/AuthComponents/Selector/UserAction';
import { useCallback } from 'react';
import { Notif } from './customHooks';

export const TokenHandler = () => {
    const [user, setUser] = AuthReducer(ACTION.user);

    const execute = async ({ data }, callback = async () => {}) => {
        if (data.name === 'TokenExpiredError' && user) {
            try {
                const { data: userRefresh } = await refreshToken(user);
                if(localStorage.getItem('user')) {
                    localStorage.setItem('user', JSON.stringify(userRefresh));
                }
                sessionStorage.setItem('user', JSON.stringify(userRefresh));
                setUser(userRefresh);
                await callback();
            } catch (e) {
                Notif('Error: Session expirée, veuillez-vous reconnecter', 'error', 'bottom-right');
            }
        }
    };

    return { execute };
}
