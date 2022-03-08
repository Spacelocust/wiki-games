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

// Users calls
export const signin = (value) => API.post('/users/signin', value);
export const signup = (value) => API.post('/users/signup', value);
export const getUserByToken = (value) => API.post('/users/token', value);
export const refreshToken = (value) => API.post('/users/refresh_token', value);

// Game calls
export const getTeamsByGame = (id) => API.get(`/games/${id}/teams`);

// Matchs calls
export const getMatchByBet = (value) => API.post(`/matchs/match_bets`, value);
export const addBet = (value) => API.post(`/matchs/match_bets/add`, value);

// Leagues call
export const getLeague = (id) => API.get(`/leagues/${id}`);

// Teams call
export const getTeam = (id) => API.get(`/teams/${id}`);

// Favorite calls
export const addFavorite = (id, path = 'teams') => API.post(`/${path}/favorite/add`, { id });
export const deleteFavorite = (id, path = 'teams') => API.delete(`/${path}/favorite/${id}`);

export default API;
