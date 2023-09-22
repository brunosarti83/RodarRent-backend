require('@babel/register');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const CustomError = require('../../utils/customError');
const { render } = require('@react-email/render');
const { Normal } = require('./emailTemplates/normal');
const { ResetPassword } = require('./emailTemplates/resetPassword');
const { Register } = require('./emailTemplates/register');

dotenv.config();

const sendEmailHandler = async (data) => {
  const { userName, toEmailAddress, subject, text, template, replyToEmailAddress } = data;
  console.log('1');
  const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_EMAIL_PASSWORD,
    },
  });
  let emailhtml;
  switch (template) {
    case 'normal':
      emailHtml = render(Normal({ text, subject, userName }));
      break;
    case 'resetPassword':
      emailHtml = render(ResetPassword({ text, subject, userName }));
      break;
    case 'register':
      console.log('2');
      emailHtml = render(Register({ userName }));
      break;
    default:
      emailHtml = render(Normal({ text, subject }));
      break;
  }

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: toEmailAddress,
    replyTo: replyToEmailAddress,
    subject: subject,
    html: emailHtml,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new CustomError(error.message, 500);
  }
  return 'Email successfully sent';
};

module.exports = sendEmailHandler;
