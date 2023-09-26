const { faker } = require('@faker-js/faker');

function newPassword() {
  let password;
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/; // Your regex pattern

  do {
    password = faker.internet.password();
  } while (!pattern.test(password));

  return password;
}

module.exports = {newPassword};
