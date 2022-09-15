import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const server = express();

server.get('/status', (req, res) => {
    res.send('is alive!!!');
});

server.use(cors());
server.use(express.json());

server.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`));
