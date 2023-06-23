import crypto from 'crypto';

const SECRET = 'secretCIS';

export const random = () => crypto.randomBytes(8).toString('hex');
export const authentication = (salt:string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex')
};

