const { body, param } = require("express-validator");

const createStatusValidators = [
  // Check that the name is not empty, a string, and at least 3 characters long
  body("name")
    .trim()
    .notEmpty().withMessage("Le nom du status est requis")
    .isString().withMessage("Le nom du status doit être une chaîne de caractères")
];

const updateStatusValidators = [
  param("id").isInt({ min: 1 }).withMessage("L'id doit être un entier positif"),
  // Check that the name is not empty, a string, and at least 3 characters long
  body("name")
    .trim()
    .notEmpty().withMessage("Le nom du status est requis")
    .isString().withMessage("Le nom du status doit être une chaîne de caractères")
];

module.exports = {
  createStatusValidators,
  updateStatusValidators
};
