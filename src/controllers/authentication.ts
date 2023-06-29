import express from 'express';

import { createUser, getUserByEmail } from '../db/users';

import { authentication, randomEncrypt } from '../helpers';


export const login = async (req: express.Request, res: express.Response) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) return res.sendStatus(403)

        const user = await getUserByEmail(email).select('+authentication.salt, +authentication.password')

        if(!user) return res.sendStatus(403)

        const expectedHash = authentication(user.authentication.salt, password)

        console.log(user.authentication.password);
        console.log(expectedHash);

        if(user.authentication.password == expectedHash) return res.sendStatus(403)

        const salt = randomEncrypt()
        user.authentication.sessionToken = authentication(salt, user._id.toString())
        await user.save()

        res.cookie('MACTEST',user.authentication.sessionToken, {domain: 'localhost', path:'/'});

        res.sendStatus(200).json(user).end();


    } catch (error) {
        
    }
}

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const {email, password, username} = req.body;
        if(!email || !password || !username) {
            return res.status(400).send('Missing fields')
        }

        const existingUser = await getUserByEmail(email);

        if(existingUser) {
            return res.sendStatus(409);
        }

        const salt = randomEncrypt();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            }
        });
        return res.status(201).send(user);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
        
    }
}