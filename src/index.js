import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRouter from "./routers/authRouter.js";
import productsRouter from "./routers/productsRouter.js";
import historicRouter from "./routers/historicRouter.js";

dotenv.config();

const server = express();

server.use(cors());
server.use(express.json());

server.get("/status", (req, res) => {
  res.send("it is alive!!!");
});

server.use(authRouter);
server.use(productsRouter);
server.use(historicRouter);

//server.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`));
server.listen(5000, () => console.log(`Listening on port 5000...`));