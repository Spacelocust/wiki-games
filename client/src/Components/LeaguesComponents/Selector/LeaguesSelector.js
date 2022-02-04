import { selector } from 'recoil';

import store from "../../../store";

export const listLeagues = selector({
    key: 'listLeagues',
    get: ({ get }) => get(store).leagues,
    set: ({ set }, newValue) => set(store, { ...newValue, leagues: newValue })
});
