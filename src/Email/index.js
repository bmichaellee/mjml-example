let email;

try {
  email = require("raw-loader!./generatedEmail.html").default; // eslint-disable-line
} catch (e) {}

export const Email = email;
