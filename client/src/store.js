import { atom } from 'recoil';

const store = atom({
    key: 'store',
    default: {
        user: {},
        games: [],
        leagues: [],
        teams: [],
    }
});

export default store;
