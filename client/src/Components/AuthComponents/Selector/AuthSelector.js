import { selector, selectorFamily, useRecoilState } from 'recoil';

import store from '../../../store';
import ACTION from './AuthAction';

export const signin = selectorFamily({
    key: 'signin',
    get: remember => ({ get }) => get(store).user,
    set: remember => ({ set }, newValue) => {
        remember && localStorage.setItem('user', JSON.stringify(newValue));
        sessionStorage.setItem('user', JSON.stringify(newValue));
        set(store, prevState => ({ ...prevState, user: newValue, }));
    }
});

export const AuthCoins = selector({
    key: 'coins',
    get: ({ get }) => get(store).user.coins,
    set: ({ set, get }, newValue) => set(store, prevState => ({
        ...prevState,
        user: { ...prevState.user, coins: newValue }
    }))
});

export const signout = selector({
    key: 'signout',
    get: ({ get }) => {},
    set: ({ set }) => {
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        set(store, prevState => ({ ...prevState, user: {}, }));
    }
});

export const AuthReducer = (action, remember = false) => {
    const [user, setUser] = useRecoilState(signin(remember));
    const [_, setSignout] = useRecoilState(signout)
    switch (action) {
        case ACTION.signin:
            return [setUser];
        case ACTION.signup:
            return [user, setUser]
        case ACTION.signout:
            return [setSignout]
        case ACTION.user:
            return [user]
    }
}
