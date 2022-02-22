import bcrypt from 'bcrypt';
import pm from '@prisma/client';

const { PrismaClient, Prisma } = pm;
const client = new PrismaClient();

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await client.user.findUnique({
            where: {
                email,
            },
        })
        if(await bcrypt.compare(password, user.password)) {
            const { password, ...rest } = user;
            res.status(200).json(rest);
        } else {
            res.status(404).json({ error: 'invalid credentials' });
        }
    } catch (e) {
        res.status(404).json({ error: 'invalid credentials' })
    }

};

export const signup = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const user = await client.user.create({
            data: {
                email,
                username,
                password: await bcrypt.hash(password, 12),
            },
            select: {
                id: true,
                email: true,
                username: true,
                coins: true,
            }
        });
        res.status(200).json(user);
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
