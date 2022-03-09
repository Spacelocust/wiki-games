import pm from '@prisma/client';
import api from '../axiosBase.js';

const { PrismaClient } = pm;
const client = new PrismaClient();

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

export const getTeamsFavorite = async (req, res) => {
    try {
        const { favoriteTeam } = await client.user.findUnique({
            where: {
                id: req.userId,
            },
            select: {
                favoriteTeam: true,
            }
        })
        const { data: teams } = await api.get(`/teams/?filter[id]=${favoriteTeam.map(({ teamId }) => teamId)}`);
        res.status(201).json(teams);
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Erreur lors de la récupération' });
    }
};

export const addTeamFavorite = async (req, res) => {
    const { id } = req.body;
    try {
        const favoriteTeam = await client.favoriteTeam.create({
            data: {
                teamId: id,
                userId: req.userId
            }
        });
        res.status(201).json(favoriteTeam);
    } catch (e) {
        res.status(500).json({ message: 'Erreur lors de l\'ajout' });
    }
};

export const deleteTeamFavorite = async (req, res) => {
    try {
        const favoriteTeam = await client.favoriteTeam.delete({
            where: {
                id: parseInt(req.params.id),
            }
        });
        res.status(200).json(favoriteTeam);
    } catch (e) {
        res.status(500).json({ message: 'Erreur lors de la suppression' });
    }
};
