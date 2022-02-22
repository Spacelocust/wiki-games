import { atom } from 'recoil';
import { isEmpty } from 'lodash';

const checkUserExists = () => {
    let user = {}
    if (isEmpty(user)) {
        user = JSON.parse(sessionStorage.getItem('user'));
        if (isEmpty(user)) {
            user = JSON.parse(localStorage.getItem('user'));
        }
    }
    return user;
}

const store = atom({
    key: 'store',
    default: {
        user: checkUserExists(),
        games: 'games',
        leagues: 'leagues',
        teams: [],
    }
})

export default store;
