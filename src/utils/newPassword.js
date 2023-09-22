const { faker } = require('@faker-js/faker');


const newPassword = () => {return  faker.internet.password()}
  
module.exports = {newPassword};