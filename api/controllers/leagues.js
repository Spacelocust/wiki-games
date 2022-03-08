import api from '../axiosBase.js';

export const getLeague = async (req, res) => {
    try {
        const { data } = await api.get(`/leagues/${req.params.id}`);
        res.set({
            'Content-Type': 'application/json',
            'Cache-Control': 'max-age: 60'
        });
        res.status(200).json(data);
    } catch (e) {
        res.status(404).send({ message: 'league introuvable' });
    }
};
