import { atom } from 'recoil';

const store = atom({
    key: 'store',
    default: {
        user: {},
        games: 'games',
        leagues: 'leagues',
        teams: [],
    }
})

export default store;
