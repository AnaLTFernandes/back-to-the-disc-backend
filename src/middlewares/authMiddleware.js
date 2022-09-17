import mongo from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { COLLECTIONS } from "../enums/collections.js";

const db = await mongo();


async function hasToken (req, res, next) {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) return res.sendStatus(STATUS_CODE.UNPROCESSABLE_ENTITY);

    let session;

    try {
        session = await db
          .collection(COLLECTIONS.SESSIONS)
          .findOne({ token });
    } catch (err) {
        console.error(err);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }

    if (!session || session.status === "inactive") {
        return res
            .status(STATUS_CODE.UNAUTHORIZED)
            .send({ message: "Usuário não está logado." });
    }

    req.locals.token = token;
    req.locals.session = session;

    next();
}

export { hasToken };