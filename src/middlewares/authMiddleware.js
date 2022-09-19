import mongo from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { COLLECTIONS } from "../enums/collections.js";

const db = await mongo();


const SECRET_PASSWORD = "backtothedisctool";

async function hasToken(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  let session;

  if (!token) return res.sendStatus(STATUS_CODE.UNPROCESSABLE_ENTITY);

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

  next();
}

export { hasToken };
