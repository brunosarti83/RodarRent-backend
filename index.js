//acá conecto sequelize con el server
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const performHealthCheck = require("./src/utils/performHealthCheck.js");
const sendEmailsToCustomers = require("./src/utils/sendEmailsToCustomers");
const updateBookingStatus = require("./src/utils/updateBookingStatus.js");

// Syncing all the models at once.
conn.sync({ force: false, alter: false }).then(async () => {
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
    performHealthCheck();
    //sendEmailsToCustomers();
    updateBookingStatus();
    setInterval(performHealthCheck, 60000);
    //setInterval(sendEmailsToCustomers, 24 * 60 * 60 * 1000);
    setInterval(updateBookingStatus, 24 * 60 * 60 * 1000);
  });
});

//sync es una promesa, en el then levanto el server
