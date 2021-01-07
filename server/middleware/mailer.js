const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const config = require("../../config");
const app = require("express")();
const env = app.get("env");

const { email, password, baseUrl } = config[env].mailing;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: email,
    pass: password,
  },
});

const MailGenerator = new Mailgen({
  theme: "salted",
  product: {
    name: "Clockware",
    link: baseUrl,
  },
});

const createMail = (someMailFunc) => (req, res, next) => {
  try {
    const { userEmail, mail, subj } = someMailFunc(req.body);
    const generatedMail = MailGenerator.generate(mail);
    const message = {
      from: email,
      to: userEmail,
      subject: subj,
      html: generatedMail,
    };
    req.body = message;
    next();
  } catch {
    res.status(400).send({ msg: "Mail does not configure" });
  }
};

const sendMail = () => async (req, res) => {
  try {
    const message = req.body;
    await transporter.sendMail(message);
    res.json({ msg: "you should receive an email from us" });
  } catch (e) {
    console.error(e.message);
    res.status(400).send({ msg: "Something went wrong and mail was not sent" });
  }
};

module.exports = {
  createMail,
  sendMail,
};
