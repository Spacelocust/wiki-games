import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pm from '@prisma/client';
import dotenv from 'dotenv';

const { PrismaClient, Prisma } = pm;
const client = new PrismaClient();

dotenv.config();

// login user
export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await client.user.findUnique({
            where: {
                email
            },
            select: {
                bet: true,
            },
        });
        if (await bcrypt.compare(password, user.password)) {
            const { password, ...rest } = user;
            const token = await jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '3600s' });
            const refreshToken = await jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_REFRESH, { expiresIn: '86400s' });

            res.status(200).json({ ...rest, token, refreshToken });
        } else {
            res.status(400).json({ error: 'invalid credentials' });
        }
    } catch (e) {
        res.status(500).json(e);
    }
};

// register user
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
                coins: true,
                bet: true,
            },
        });
        const token = await jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '3600s' });
        const refreshToken = await jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_REFRESH, { expiresIn: '86400s' });

        res.status(200).json({ ...user, token, refreshToken });
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

// get user by his token
export const userByToken = async (req, res) => {
    const { token, refreshToken } = req.body;
    try {
        const user = await client.user.findUnique({
            where: {
                id: parseInt(req.userId)
            },
            select: {
                id: true,
                email: true,
                username: true,
                coins: true,
                bet: true
            },
        });

        res.status(200).json({ ...user, token, refreshToken });
    } catch (e) {
        res.status(500).json({ message: 'erreur lors de la récupération' });
    }
}

// refresh the user token
export const refreshToken = async (req, res) => {
    try {
        const { refreshToken }= req.body;
        const isCustomAuth = refreshToken.length < 500;

        if(refreshToken && isCustomAuth) {
            let decodedData = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH);
            const user = await client.user.findUnique({
                where: {
                    id: decodedData.id
                },
                select: {
                    id: true,
                    email: true,
                    username: true,
                    coins: true,
                    bet: true,
                },
            });
            const token = await jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '3600s' });
            res.status(200).json({ ...user, token, refreshToken })
        }
    } catch (e) {
        if (e.name === 'TokenExpiredError') {
            res.status(403).json({
                name: 'TokenExpiredError',
                message: 'No token or token expired, please sign in again'
            });
        } else {
            res.status(500).json({ message: 'error' });
        }
    }
}

// update user
export const edit = async (req, res) => {
    const { ...fields } = req.body;
    try {
        const findUser = await client.user.findUnique({
            where: {
                id: req.userId
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
                bet: true,
            }
        });

        res.status(201).json({ user });
    } catch (e) {
        res.status(500).json({ message: 'erreur lors de la modificacion' });
    }
};

