import mongo from "../database/db.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

import { STATUS_CODE } from "../enums/statusCode.js";
import { COLLECTIONS } from "../enums/collections.js";

const db = await mongo();

dotenv.config();
const PASSWORD = process.env.NODEMAILER_PASSWORD;

let transpoter = nodemailer.createTransport({
  host: "SMTP.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: "back.to.the.disc@outlook.com",
    pass: PASSWORD,
  },
});

async function insertHistoric(req, res) {
  const { session } = res.locals;
  const { products, payment, sendEmail } = req.body;

  let discs = products.map((value) => value.name);
  discs = discs.toString().replace(",", ", ");

  const user = await db
    .collection(COLLECTIONS.USERS)
    .findOne({ _id: session.userId });

  if (sendEmail) {
    await transpoter.sendMail({
      from: "Back To The Disc <back.to.the.disc@outlook.com>",
      to: user.email,
      subject: "Back To The Disc informa!",
      text: "Compra efetuada com sucesso! Agradecemos sua preferência",
      html: `<h3>Compra efetuada com sucesso! Agradecemos sua preferência</h3><p>Discos comprados por você: ${discs}</p>`,
    });

    try {
      console.log("E-mail sent!");
    } catch {
      console.error(err);
    }
  }

  try {
    await db.collection(COLLECTIONS.HISTORIC).updateOne(
      { userId: user._id },
      {
        $push: {
          historic: {
            date: new Date(),
            products: products,
            payment: payment,
          },
        },
      }
    );

    return res.sendStatus(STATUS_CODE.CREATED);
  } catch (err) {
    console.error(err);
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

async function getHistoric(req, res) {
  const { session } = res.locals;

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
