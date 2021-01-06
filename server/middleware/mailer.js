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

const sendConfirmingletter = (req, res) => {
  const { userEmail, name } = req.body;

  const response = {
    body: {
      name,
      intro: ["Thanks for order!", "Your order details:"],
      table: {
        data: [
          {
            "Order date": "Tue, 02.01.2021 18:00",
            City: "Dnipro",
            "Your master": "Jo Jo 5star",
            "Size of clock": "Middle clock",
          },
        ],
      },
    },
  };

  const mail = MailGenerator.generate(response);

  const message = {
    from: email,
    to: userEmail,
    subject: "Your order has been processed successfully",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(200)
        .json({ msg: "you should receive an email from us" });
    })
    .catch((error) => console.error(error));
};

const sendRatingRequest = (req, res) => {
  const { name, order_id } = req.body;

  let response = {
    body: {
      name,
      intro: "Your bill has arrived!",
      table: {
        data: [
          {
            item: "MERN stack book",
            description: "A mern stack book",
            price: "$10.99",
          },
        ],
      },
      outro: "Looking forward to do more business with you",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: userEmail,
    subject: "transaction",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(200)
        .json({ msg: "you should receive an email from us" });
    })
    .catch((error) => console.error(error));
};

module.exports = {
  sendConfirmingletter,
  sendRatingRequest,
};
