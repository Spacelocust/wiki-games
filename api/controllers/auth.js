import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pm from '@prisma/client';
import dotenv from 'dotenv';

const { PrismaClient, Prisma } = pm;
const client = new PrismaClient();

dotenv.config();

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await client.user.findUnique({
            where: {
                email
            }
        });
        if (await bcrypt.compare(password, user.password)) {
            const { password, ...rest } = user;
            const token = await jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ ...rest, token });
        } else {
            res.status(400).json({ error: 'invalid credentials' });
        }
    } catch (e) {
        res.status(500).json(e);
    }
};

export const signup = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const user = await client.user.create({
            data: {
                email,
                username,
                password: await bcrypt.hash(password, 12)
            },
            select: {
                id: true,
                email: true,
                username: true,
                coins: true
            }
        });
        const token = await jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ ...user, token});
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                res.status(500).json({ message: 'Adresse mail déjà utilisé' });
            }
        } else {
            res.status(500).json(e);
        }
    }
};

export const edit = async  (req, res) => {
    const { ...fields } = req.body;
    try {
        const findUser = await client.user.findUnique({
            where: {
                id: userId,
            }
        });
        const user = await client.user.update({
            where: {
                id: parseInt(req.userId)
            },
            data: {
               ...fields
            },
            select: {
                id: true,
                email: true,
                username: true,
                coins: true,
            }
        });
        const token = await jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ ...user, token});
    } catch (e) {
        res.status(500).json({ error: 'erreur lors de la modificacion' });
    }
};

