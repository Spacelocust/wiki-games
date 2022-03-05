import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('user')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`;
    } else {
        if (sessionStorage.getItem('user')) {
            req.headers.Authorization = `Bearer ${JSON.parse(sessionStorage.getItem('user')).token}`;
        }
    }

    return req;
});

// users call
export const signin = (value) => API.post('/users/signin', value);
export const signup = (value) => API.post('/users/signup', value);
export const getUserByToken = (value) => API.post('/users/token', value);
export const refreshToken = (value) => API.post('/users/refresh_token', value);

// matchs call
export const getMatchByBet = (value) => API.post(`/matchs/match_bets`, value);
export const addBet = (value) => API.post(`/matchs/match_bets/add`, value);

// teams call
export const getTeam = (id) => API.get(`/teams/${id}`);

export default API;
