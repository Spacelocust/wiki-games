import api from '../axiosBase.js';

export const getTeam = async (req, res) => {
    try {
        const { data: team } = await api.get(`/teams/${req.params.id}`);
        const { data: match } = await api.get(`/teams/${req.params.id}/matches?filter[running]=true`);
        res.set({
            'Content-Type': 'application/json',
            'Cache-Control': 'max-age: 60'
        });
        res.send({ team, match });
    } catch (e) {
        res.status(500).send(e);
    }
};
