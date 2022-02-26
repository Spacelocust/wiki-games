import { atom, useSetRecoilState } from 'recoil';
import { isEmpty } from 'lodash';

const checkUserExist = () => {
    let user = {}
    if (!isEmpty(JSON.parse(localStorage.getItem('user')))) {
        user = JSON.parse(localStorage.getItem('user'));
    } else {
        if (!isEmpty(JSON.parse(sessionStorage.getItem('user')))) {
            user = JSON.parse(sessionStorage.getItem('user'));
        }
    }
    if (user) {

    }
    return user;
}

const store = atom({
    key: 'store',
    default: {
        user: checkUserExist(),
        games: [],
        leagues: [],
        teams: [],
    }
});

export default store;
