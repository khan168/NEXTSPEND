const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createUser": {
      return [
        body("name", "Cannot be empty").notEmpty(),
        body("email", "Invalid email").exists().isEmail(),
        body("password", "Invalid password").isLength({ min: 5 }),
      ];
    }
    case "loginUser": {
      return [
        body("email", "Invalid email").exists().isEmail(),
        body("password", "Invalid password").isLength({ min: 5 }),
      ];
    }
  }
};
