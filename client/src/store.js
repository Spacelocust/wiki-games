import { atom } from 'recoil';

const store = atom({
    key: 'store',
    default: {
        user: {
            name: 'test',
        },
        games: [],
        leagues: [],
        teams: [],
    }
})

export default store;