import { selector } from 'recoil';

import store from "../../../store";

export const listGames = selector({
    key: 'listGames',
    get: ({ get }) => get(store).games,
    set: ({ set }, newValue) => set(store, { ...store, games: newValue })
});
