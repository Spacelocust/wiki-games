import { selector } from 'recoil';

import store from '../../../store';

export const setUser = selector({
    key: 'user',
    get: ({ get }) => {
        const { user } = get(store);

        return user;
    },
    set: ({ set }, newValue) => set(store, {...store, user: newValue}),
});
