const yup = require("yup");

const schema = {};
const name = yup
  .string()
  .matches(/^[a-z -]+$/gi)
  .min(2)
  .max(20)
  .required();

schema.masters = yup.object().shape({
  city: yup.number().required(),
  begin: yup.date().required(),
  end: yup.date().required(),
});

schema.customer = yup.object().shape({
  name: name,
  surname: name,
  email: yup.string().email().required(),
});

schema.loginForm = yup.object().shape({
  name: name,
  password: yup.string().trim().min(5).required(),
});

module.exports = schema;
