import pm from '@prisma/client';
import { checkValue1Value2 } from '../helpers/exceptions.js';

const { PrismaClient } = pm;
const client = new PrismaClient();

export const addMatchBet = async (req, res) => {
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
        res.status(201).json({ bet });
    } catch (e) {
        res.status(500).send(e);
    }
};
