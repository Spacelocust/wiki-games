import { refreshToken } from '../api/axiosBase';
import AuthReducer from '../Components/AuthComponents/Selector/UserSelector';
import ACTION from '../Components/AuthComponents/Selector/UserAction';
import { useCallback } from 'react';

export const TokenHandler = () => {
    const [user, setUser] = AuthReducer(ACTION.user);

    const execute = useCallback(({ data }, callback) => {
        return (async () => {
            if (data.name === 'TokenExpiredError' && user) {
                try {
                    const { data } = await refreshToken(user);
                    if(localStorage.getItem('user')) {
                        localStorage.setItem('user', JSON.stringify(data));
                    }
                    sessionStorage.setItem('user', JSON.stringify(data));
                    setUser(data);
                    await callback();
                } catch (e) {
                    console.log(e)
                }
            }
        })
    }, [])

    return { execute };
}
