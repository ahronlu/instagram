const { body, check, validationResult } = require("express-validator");

const loginValidationRules = () => {
  return [
    body("username", "Please include a username").not().isEmpty(),
    body("password", "Please include a password").not().isEmpty(),
  ];
};

const registerValidationRules = () => {
  return [
    body("email", "Please include a valid email").isEmail(),
    body("username", "Please set a username between 2 to 16 digits")
      .not()
      .isLength({ min: 2, max: 16 }),
    body("password", "Please set a password between 6 to 16 digits")
      .not()
      .isLength({ min: 6, max: 16 }),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = { loginValidationRules, registerValidationRules, validate };
