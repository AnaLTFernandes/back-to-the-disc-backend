import mongo from "../database/db.js";
import bcrypt from "bcrypt";
import { STATUS_CODE } from "../enums/statusCode.js";
import { COLLECTIONS } from "../enums/collections.js";

const db = await mongo();

async function signUp(req, res) {
  const { name, email, password } = req.body;

  const hashPassword = bcrypt.hashSync(password, 12);

  try {
    const userExisting = await db.collection(COLLECTIONS.USERS).findOne({ email });

    if (userExisting) {
      return res.sendStatus(STATUS_CODE.CONFLICT);
    }

    db.collection(COLLECTIONS.USERS).insertOne({
      name,
      email,
      password: hashPassword,
    });

    return res.sendStatus(STATUS_CODE.CREATED);
  } catch (err) {
    console.error(err);
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export { signUp };
