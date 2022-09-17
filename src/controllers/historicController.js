import mongo from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { COLLECTIONS } from "../enums/collections.js";

const db = await mongo();

async function insertHistoric(req, res) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const { name, image, price, quantity } = req.body;

  try {
    const session = await db
      .collection(COLLECTIONS.SESSIONS)
      .findOne({ token });

    if (!session || session.status === "inactive") {
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .send({ message: "Usuário não está logado" });
    }

    const user = await db
      .collection(COLLECTIONS.USERS)
      .findOne({ _id: session.userId });

    await db.collection(COLLECTIONS.HISTORIC).insertOne({
      userId: user._id,
      historic: [
        {
          date: new Date(),
          products: [req.body],
        },
      ],
    });

    return res.sendStatus(STATUS_CODE.CREATED);
  } catch (err) {
    console.error(err);
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export { insertHistoric };
