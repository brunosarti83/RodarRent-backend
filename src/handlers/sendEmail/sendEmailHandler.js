require("@babel/register");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const CustomError = require("../../utils/customError");
const { render } = require("@react-email/render");
const { Normal } = require("./emailTemplates/normal");
const { ResetPassword } = require("./emailTemplates/resetPassword");
const { Register } = require("./emailTemplates/register");
const { Review } = require("./emailTemplates/review");
const { BookingConfirmation } = require("./emailTemplates/bookingConfirmation");
const { BookingCancelation } = require("./emailTemplates/bookingCancelation");

dotenv.config();

const sendEmailHandler = async (data) => {
  const { toEmailAddress, subject, template, replyToEmailAddress } = data;

  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_EMAIL_PASSWORD,
    },
  });
  let emailhtml;
  switch (template) {
    case "normal":
      emailHtml = render(Normal(data));
      break;
    case "resetPassword":
      emailHtml = render(ResetPassword(data));
      break;
    case "register":
      emailHtml = render(Register(data));
      break;
    case "review":
      emailHtml = render(Review(data));
      break;
    case "bookingConfirmation":
      emailHtml = render(BookingConfirmation(data));
      break;
    case "bookingCancelation":
      emailHtml = render(BookingCancelation(data));
      break;
    default:
      emailHtml = render(Normal(data));
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
  return "Email successfully sent";
};

module.exports = sendEmailHandler;
