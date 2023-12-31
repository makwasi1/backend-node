import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import mongoose from 'mongoose';

import router from './router'


const app = express();


app.use(cors({
    credentials: true,
}))

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(5400, () => {
    console.log('Server is running on http://localhost:5400');
});


const MONGO_URL = 'mongodb+srv://makwasi:makwasi@cluster0.1zrjxib.mongodb.net/?retryWrites=true&w=majority'

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL)
mongoose.connection.on('error', (err: Error) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
});

app.use('/api', router());