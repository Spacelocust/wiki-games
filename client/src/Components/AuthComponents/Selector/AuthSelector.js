import { selector, selectorFamily } from 'recoil';
import { isEmpty } from 'lodash';

import store from '../../../store';

export const signin = selectorFamily({
    key: 'signin',
    get: remember => ({ get }) => {
        let user = get(store).user;
        if (isEmpty(user)) {
            user = JSON.parse(sessionStorage.getItem('user'));
            if (isEmpty(user)) {
                user = JSON.parse(localStorage.getItem('user'));
            }
        }

        return user;
    },
    set: remember => ({ set }, newValue) => {
        remember && localStorage.setItem('user', JSON.stringify(newValue));
        sessionStorage.setItem('user', JSON.stringify(newValue));
        set(store, { ...store, user: newValue });
    }
});

export const signout = selector({
    key: 'signout',
    get: ({ get }) => {},
    set: ({ set }) => {
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        set(store, { ...store, user: {} });
    }
});
