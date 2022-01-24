import api from '../axiosBase.js';

export const getGames = async (req, res) => {
    try {
        const { data } = await api.get('/videogames')
        res.send(data);
    } catch (e) {
        console.log(e);
    }
}