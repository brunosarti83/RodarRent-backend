//acá creo mi server. en index.js conecto sequelize con el server
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const paymentsRouter = require("./routes/pay/paymentsRouter");
const customersRouter = require("./routes/customers/customersRouter.js");
const vehiclesRouter = require("./routes/vehicles/vehiclesRouter.js");
const bookingsRouter = require("./routes/bookings/bookingsRouter.js");
const locationsRouter = require("./routes/locations/locationsRouter.js");
const cookieSession = require("cookie-session");
const passport = require("passport");
const cors = require("cors");
const session = require("express-session");
// aqui puse lo nuevo
const mercadoPagoRouter = require("./routes/mercadoPagoRouter");
const sendEmailRouter = require("./routes/sendEmailRouter");
const reviewsRouter = require("./routes/review/reviewsRouter");
const usersRouter = require("../src/routes/users/usersRouter");

const server = express();
server.name = "API";

server.use(session({ secret: "dogs" }));
server.use(passport.initialize());
server.use(passport.session());

require("../auth"); //ejecuta todo lo de auth.js

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));

// server.use(cookieSession({
//   name: 'session',
//   keys: ['cyberwolve'],
//   maxAge: 24*60*60*100,
// }));

server.use(
  cors({
    origin: '*', //process.env.CLIENT_URL,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);
server.use(morgan("dev"));

server.use((req, res, next) => {
  //res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", paymentsRouter);
server.use("/", customersRouter);
server.use("/", vehiclesRouter);
server.use("/", bookingsRouter);
server.use("/", locationsRouter);
server.use("/", mercadoPagoRouter);
server.use("/", sendEmailRouter);
server.use("/", reviewsRouter);
server.use("/", usersRouter);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
