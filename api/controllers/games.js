import api from '../axiosBase.js';
import { IMG_GAMES } from "../constant.js";

export const getGames = async (req, res) => {
    try {
        let response = [];
        const { data } = await api.get('/videogames')
        res.set({
            'Content-Type': 'application/json',
            'Cache-Control': 'max-age: 60',
        });
        response = data?.reduce((acc, curr) => [...acc, { ...curr, ['img_url']: IMG_GAMES[curr.slug] }], [])
        res.send(response);
    } catch (e) {
        res.status(500).send(e);
    }
}

export const getGame = async (req, res) => {
    try {
        const { data } = await api.get(`/videogames/${req.params.id}`);
        res.set({
            'Content-Type': 'application/json',
            'Cache-Control': 'max-age: 60',
        });
        res.send({ ...data, ['img_url']: IMG_GAMES[data.slug] });
    } catch (e) {
        res.status(500).send(e);
    }
}
