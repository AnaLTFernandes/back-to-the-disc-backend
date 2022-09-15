import joi from "joi";

const signUpSchema = joi.object({
  name: joi.string().min(4).required(),
  email: joi.string().email().required(),
  password: joi
    .string()
    .min(4)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

export { signUpSchema };
