import { selector } from 'recoil';
import { isEmpty } from "lodash";

import store from '../../../store';

export const setUser = selector({
    key: 'user',
    get: ({ get }) => {
        const { user } = get(store);

        return user;
    },
    set: ({ set }, newValue) => set(store, {...store, user: newValue}),
});

export const isAuthent = selector({
    key: 'isAuthent',
    get: ({ get }) => !isEmpty(get(store).user),
})
