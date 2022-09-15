import { signUpSchema, signInSchema } from "../schemas/authSchema.js";
import { STATUS_CODE } from "../enums/statusCode.js";

function signUpSchemaMiddleware(req, res, next) {
  const { name, email, password } = req.body;

  const isValid = signUpSchema.validate(
    {
      name,
      email,
      password,
    },
    { abortEarly: false }
  );

  if (isValid.error) {
    const err = isValid.error.details.map(({ message }) => message);
    return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(err);
  }

  next();
}

function signInSchemaMiddleware(req, res, next) {
  const { email, password } = req.body;

  const isValid = signInSchema.validate(
    {
      email,
      password,
    },
    { abortEarly: false }
  );

  if (isValid.error) {
    const err = isValid.error.details.map(({ message }) => message);
    return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(err);
  }

  next();
}

export { signUpSchemaMiddleware, signInSchemaMiddleware };
