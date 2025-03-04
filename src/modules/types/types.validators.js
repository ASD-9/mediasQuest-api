const { body, param } = require("express-validator");

const createTypeValidators = [
  // Check that the name is not empty, a string, and at least 3 characters long
  body("name")
    .trim()
    .notEmpty().withMessage("Le nom du type est requis")
    .isString().withMessage("Le nom du type doit être une chaîne de caractères")
];

const updateTypeValidators = [
  param("id").isInt({ min: 1 }).withMessage("L'id doit être un entier positif"),
  // Check that the name is not empty, a string, and at least 3 characters long
  body("name")
    .trim()
    .notEmpty().withMessage("Le nom du type est requis")
    .isString().withMessage("Le nom du type doit être une chaîne de caractères")
];

module.exports = {
  createTypeValidators,
  updateTypeValidators
};
