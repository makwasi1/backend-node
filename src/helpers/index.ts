import crypto from 'crypto';

const SECRET = 'secretCIS';


export const authentication = (salt:string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex')
};

export const randomEncrypt = () => crypto.randomBytes(128).toString('base64');
