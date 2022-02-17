import api from '../axiosBase.js';
import { IMG_GAMES } from '../constant.js';
import parser from 'parse-link-header';


export const getGames = async (req, res) => {
    try {
        let response = [];
        const { data } = await api.get('/videogames');
        res.set({
            'Content-Type': 'application/json',
            'Cache-Control': 'max-age: 60'
        });
        response = data?.reduce((acc, curr) => [...acc, { ...curr, ['img_url']: IMG_GAMES[curr.slug] }], []);
        res.send(response);
    } catch (e) {
        res.status(500).send(e);
    }
};

export const getGame = async (req, res) => {
    try {
        const { data } = await api.get(`/videogames/${req.params.id}`);
        res.set({
            'Content-Type': 'application/json',
            'Cache-Control': 'max-age: 60'
        });
        res.send({ ...data, ['img_url']: IMG_GAMES[data.slug] });
    } catch (e) {
        res.status(500).send(e);
    }
};

export const getGameMatches = async (req, res) => {
    try {
        const { data } = await api.get(`/matches?filter[videogame]=${req.params.id}`);
        res.set({
            'Content-Type': 'application/json',
            'Cache-Control': 'max-age: 60'
        });
        res.send(data);
    } catch (e) {
        res.status(500).send(e);
    }
};

export const  getGamePastMatches = async (req, res) => {
    const { id, page, per_page } = req.params;
    try {
        const { data, headers } = await api.get(`/matches/past/?filter[videogame]=${id}&page=${page}&per_page=${per_page}`);
        res.set({
            'Content-Type': 'application/json',
            'Cache-Control': 'max-age: 60'
        });
        const link = parser(headers.link)
        res.send({ list: data, link });
    } catch (e) {
        res.status(500).send(e);
    }
};

export const getGameRunningMatches = async (req, res) => {
    const { id, page, per_page } = req.params;
    try {
        const { data, headers } = await api.get(`/matches/running/?filter[videogame]=${id}&page=${page}&per_page=${per_page}`);
        res.set({
            'Content-Type': 'application/json',
            'Cache-Control': 'max-age: 60'
        });
        const link = parser(headers.link)
        res.send({ list: data, link });
    } catch (e) {
        res.status(500).send(e);
    }
};

export const getGameUpcommingMatches = async (req, res) => {
    const { id, page, per_page } = req.params;
    try {
        const { data, headers } = await api.get(`/matches/upcoming/?filter[videogame]=${id}&page=${page}&per_page=${per_page}`);
        res.set({
            'Content-Type': 'application/json',
            'Cache-Control': 'max-age: 60',
        });
        const link = parser(headers.link);
        res.send({ list: data, link });
    } catch (e) {
        res.status(500).send(e);
    }
};



