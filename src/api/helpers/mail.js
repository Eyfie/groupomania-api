/* eslint-disable no-console */
const createError = require('http-errors');
const nodemailer = require('nodemailer');

const mail = (email, username, retriever) => {
  const message = `
  <h1>Changement de mot de passe</h1>
  <p>Veuillez cliquer sur le lien ci-dessous :</p>
  <a href="https://127.0.0.1:4200/forgot/modify?username=${username}&retriever=${retriever}">Changement de Mot de Passe</a>
  <p>Vous disposez de 10 minutes pour changer de mot de passe à la réception de ce mail.</p>
  <p>Bonne journée !</p>
  `;
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '090fa9dd4d3cfb',
      pass: '69d80293f4e319',
    },
  });
  const mailOptions = {
    from: process.env.MAIL,
    to: email,
    subject: 'Groupomania - Changement',
    html: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      throw new createError[500]('Something went wrong, please try again');
    }
    console.log(info.envelope);
    console.log(info.messageId);
    return true;
  });
};

module.exports = mail;
