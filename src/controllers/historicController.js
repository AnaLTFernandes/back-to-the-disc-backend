import mongo from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { COLLECTIONS } from "../enums/collections.js";

const db = await mongo();

async function insertHistoric(req, res) {
  const { session } = req.locals;

  try {
    const user = await db
      .collection(COLLECTIONS.USERS)
      .findOne({ _id: session.userId });

    await db.collection(COLLECTIONS.HISTORIC).updateOne(
      { userId: user._id },
      { $push: {
        historic:
        {
          date: new Date(),
          products: [...req.body],
        },
      }}
    );

    return res.sendStatus(STATUS_CODE.CREATED);
  } catch (err) {
    console.error(err);
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

async function getHistoric(req, res) {
  const { session } = req.locals;

  let historic;

  try {
    historic = await db
      .collection(COLLECTIONS.HISTORIC)
      .findOne({ userId: session.userId });
  } catch (err) {
    console.error(err);
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }

  return res.status(STATUS_CODE.OK).send(historic.historic);
}

export { insertHistoric, getHistoric };
