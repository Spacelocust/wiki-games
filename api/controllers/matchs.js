import pm from '@prisma/client';
import { checkValue1Value2 } from '../helpers/exceptions.js';
import api from '../axiosBase.js';

const { PrismaClient } = pm;
const client = new PrismaClient();

export const addBet = async (req, res) => {
    const { choice, match, coins } = req.body;

    try {
        const userFound = await client.user.findUnique({
            where: {
                id: req.userId
            },
            select: {
                coins: true
            }
        });
        checkValue1Value2(userFound.coins, coins);
        await client.user.update({
            where: {
                id: req.userId
            },
            data: {
                coins: (userFound.coins - coins)
            }
        });

        const bet = await client.bet.create({
            data: {
                choice,
                match,
                coins,
                userId: req.userId
            },
            select: {
                id: true,
                choice: true,
                match: true,
                coins: true
            }
        });
        res.status(201).json(bet);
    } catch (e) {
        res.status(500).send(e);
    }
};

export const getMatchByBet = async (req, res) => {
    const { bets } = req.body;
    try {
        const { data: matchs } = await api.get(`/matches/?filter[id]=${bets.reduce((acc, curr) => acc += `${curr.match},`, '')}&sort=-begin_at`);
        res.set({
            'Content-Type': 'application/json',
            'Cache-Control': 'max-age: 60',
        });

        let betsDone = [];
        const coinsReceived = matchs.reduce((acc, curr) => {
            let bet = bets.find((bet) => bet.match === curr.id);
            (curr.status === 'finished' && bet.status) && betsDone.push(bet.id);
            return acc += (curr.status === 'finished' && bet.status) ? (bet.choice === curr.winner_id ? bet.coins * 2 : - bet.coins) : 0;
        }, 0);

        const { bet: betsUpdated, coins: coinsUser } = await client.user.update({
            where: {
              id: parseInt(req.userId),
            },
            data: {
                coins: {
                   [coinsReceived > 0 ? 'increment' : 'decrement']: coinsReceived > 0 ? coinsReceived : coinsReceived * -1,
                },
                bet: {
                    updateMany: {
                        where: {
                            id: { in: betsDone },
                        },
                        data: {
                            status: false,
                        },
                    },
                },
            },
            select: {
                coins: true,
                bet: true,
            }
        });

        res.status(200).json({ matchs, coinsReceived, bets: { betsUpdated, done: betsDone.length > 0 }, coinsUser });
    } catch (e) {
        res.status(500).send(e);
    }
}
