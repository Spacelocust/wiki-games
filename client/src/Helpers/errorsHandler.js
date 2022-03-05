import { refreshToken } from '../api/axiosBase';
import AuthReducer from '../Components/AuthComponents/Selector/UserSelector';
import ACTION from '../Components/AuthComponents/Selector/UserAction';
import { useCallback } from 'react';

export const TokenHandler = () => {
    const [user, setUser] = AuthReducer(ACTION.user);

    const execute = useCallback(({ data }) => {
        return (async () => {
            if (data.name === 'TokenExpiredError' && user) {
                try {
                    const { data: userRefresh } = await refreshToken(user);
                    if(localStorage.getItem('user')) {
                        localStorage.setItem('user', JSON.stringify(userRefresh));
                    }
                    sessionStorage.setItem('user', JSON.stringify(userRefresh));
                    setUser(userRefresh);
                } catch (e) {
                    console.log(e)
                }
            }
        })
    }, [])

    return { execute };
}
