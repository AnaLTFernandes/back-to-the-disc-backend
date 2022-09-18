import mongo from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { COLLECTIONS } from "../enums/collections.js";

import sgMail from "@sendgrid/mail";
const SENDGRID_API_KEY =
  "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";
sgMail.setApiKey(SENDGRID_API_KEY);

const db = await mongo();

async function insertHistoric(req, res) {
  const { session } = res.locals;
  const { products, payment, sendEmail } = req.body;

  const user = await db
    .collection(COLLECTIONS.USERS)
    .findOne({ _id: session.userId });

  if (sendEmail) {
    const msg = {
      to: user.email,
      from: "backtothedisc@gmail.com",
      subject: "Back To The Disc informa",
      text: "Compra efetuada com sucesso! Agradecemos sua preferência.",
      html: "<strong>Compra efetuada com sucesso! Agradecemos sua preferência.</strong>",
    };

    try {
      await sgMail.send(msg);
      console.log("Email sent");
    } catch (error) {
      console.error(error);
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
