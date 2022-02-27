import { selector, useRecoilState } from 'recoil';

import store from '../../../store';
import ACTION from './UserAction';

const userState = selector({
    key: 'userState',
    get: ({ get }) => get(store).user,
    set: ({ set }, newValue) => {
        set(store, prevState => ({ ...prevState, user: newValue, }));
    }
});

const AuthReducer = (action) => {
    const [user, setUser] = useRecoilState(userState);
    switch (action) {
        case ACTION.user:
            return [user, setUser];
        case ACTION.getUser:
            return [user];
        case ACTION.setUser:
            return [setUser];
    }
}

export default AuthReducer;
