import mongo from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { STATUS_CODE } from "../enums/statusCode.js";
import { COLLECTIONS } from "../enums/collections.js";

const db = await mongo();

async function signUp(req, res) {
  const { name, email, password } = req.body;

  const hashPassword = bcrypt.hashSync(password, 12);

  try {
    const userExisting = await db
      .collection(COLLECTIONS.USERS)
      .findOne({ email });

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

async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await db.collection(COLLECTIONS.USERS).findOne({ email });

    if (!user) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .send({ message: "E-mail ou senha inválidos" });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .send({ message: "E-mail ou senha inválidos!" });
    }

    const token = uuid();

    await db.collection(COLLECTIONS.SESSIONS).insertOne({
      userId: user._id,
      token,
      status: "active",
    });

    return res.send(token);
  } catch (err) {
    console.error(err);
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

async function logout(req, res) {
  res.sendStatus(STATUS_CODE.OK);
}

export { signUp, signIn, logout };
