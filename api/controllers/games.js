import pm from '@prisma/client';
import parser from 'parse-link-header';

import api from '../axiosBase.js';
import { DETAILS_GAMES, IMG_GAMES } from '../constant.js';

const { PrismaClient } = pm;
const client = new PrismaClient();

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

export const getGameMatchesByTime = async (time, req, res) => {
    const { id, page, per_page } = req.params;
    try {
        let {
            data: matchs,
            headers
        } = await api.get(`/matches/${time}/?filter[videogame]=${id}&page=${page}&per_page=${per_page}`);
        res.set({
            'Content-Type': 'application/json',
            'Cache-Control': 'max-age: 60'
        });

        matchs = await matchs.reduce(async (acc, curr) => {
            const result = await acc;
            const numberBets = await getBetMatch(curr.id);
            return [...result, { ...curr, numberBets }];
        }, []);

        const link = parser(headers.link);
        res.send({ list: matchs, link });
    } catch (e) {
        res.status(500).send(e);
    }
};

const getBetMatch = async (id) => {
    try {
        return await client.bet.count({
            where: {
                match: id
            }
        });
    } catch (e) {
        console.log(e);
    }
};

export const getGameTeams = async (req, res) => {
    try {
        const { data } = await api.get(`/teams?filter[videogame_id]=${req.params.id}&per_page=100`);
        res.set({
            'Content-Type': 'application/json',
            'Cache-Control': 'max-age: 60'
        });
        res.status(200).json(data);
    } catch (e) {
        res.status(404).json({ message: 'équipes introuvables' });
    }
};

export const getGameDetails = async (req, res) => {
    const { slug, page, per_page } = req.params;
    const gameParams = DETAILS_GAMES(slug);

    try {
        if (gameParams !== undefined) {
            const { data: details, headers } = await api.get(`/${gameParams.game}/${gameParams.target}?page=${page}&per_page=${per_page}`);
            const link = parser(headers.link);

            return res.send({ list: details, link });
        }
        return res.status(200).json({ list: [], link: null });
    } catch (e) {
        res.status(404).json({ message: 'Erreur details indisponible' });
    }
};
