import mongo from "../database/db.js";
import nodemailer from "nodemailer";

import { STATUS_CODE } from "../enums/statusCode.js";
import { COLLECTIONS } from "../enums/collections.js";

const db = await mongo();

let transpoter = nodemailer.createTransport({
  host: "SMTP.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: "backtothedisc@outlook.com",
    pass: "projeto14driven2022",
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
    transpoter
      .sendMail({
        from: "Back To The Disc <backtothedisc@outlook.com>",
        to: user.email,
        subject: "Back To The Disc informa!",
        text: "Compra efetuada com sucesso! Agradecemos sua preferência",
        html: `<h3>Compra efetuada com sucesso! Agradecemos sua preferência</h3><p>Discos comprados por você: ${discs}</p>`,
      })
      .then(() => console.log("E-mail sent!"))
      .catch((err) => console.error(err));
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
