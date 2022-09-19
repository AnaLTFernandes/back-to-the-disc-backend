import mongo from "../database/db.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { STATUS_CODE } from "../enums/statusCode.js";
import { COLLECTIONS } from "../enums/collections.js";

const db = await mongo();

dotenv.config();
const SECRET_PASSWORD = process.env.JWT_SECRET;

async function hasToken(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  let session;
  let userId;

  try {
    userId = jwt.verify(token, SECRET_PASSWORD).userId;
  } catch {
    return res
      .status(STATUS_CODE.UNPROCESSABLE_ENTITY)
      .send({ message: "Token inválido ou expirado!" });
  }

  try {
    session = await db.collection(COLLECTIONS.SESSIONS).findOne({ token });
  } catch (err) {
    console.error(err);
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }

  if (!session || session.status === "inactive") {
    return res
      .status(STATUS_CODE.UNAUTHORIZED)
      .send({ message: "Usuário não está logado." });
  }

  res.locals.token = token;
  res.locals.session = session;
  res.locals.userId = userId;

  next();
}

export { hasToken };
