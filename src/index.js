import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRouter from './routers/authRouter.js';
import productsRouter from './routers/productsRouter.js';

dotenv.config();

const server = express();

server.use(cors());
server.use(express.json());

server.get('/status', (req, res) => {
    res.send('it is alive!!!');
});

server.use(authRouter);
server.use(productsRouter);

server.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`));
