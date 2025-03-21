const { body, param } = require("express-validator");

const getMediasByCreatorValidators = [
  param("creatorId").isInt({ min: 1 }).withMessage("L'id du créateur doit être un entier positif"),
  param("typeId").isInt({ min: 1 }).withMessage("L'id du type doit être un entier positif")
];

const createMediaValidators = [
  // Check that the name is not empty, a string, and at least 3 characters long
  body("name")
    .trim()
    .notEmpty().withMessage("Le nom du média est requis")
    .isString().withMessage("Le nom du média doit être une chaîne de caractères"),
  body("status_id")
    .isInt({ min: 1 })
    .withMessage("L'id du status doit être un entier positif"),
  body("type_id")
    .isInt({ min: 1 })
    .withMessage("L'id du type doit être un entier positif")
];

const updateMediaValidators = [
  param("id").isInt({ min: 1 }).withMessage("L'id doit être un entier positif"),
  // Check that the name is not empty, a string, and at least 3 characters long
  body("name")
    .optional()
    .trim()
    .notEmpty().withMessage("Le nom du média est requis")
    .isString().withMessage("Le nom du média doit être une chaîne de caractères"),
  body("status_id")
    .optional()
    .isInt({ min: 1 })
    .withMessage("L'id du status doit être un entier positif"),
  body("type_id")
    .optional()
    .isInt({ min: 1 })
    .withMessage("L'id du type doit être un entier positif")
];

const addMediaToCreatorValidators = [
  body("media_id")
    .isInt({ min: 1 })
    .withMessage("L'id du média doit être un entier positif"),
  body("creator_id")
    .isInt({ min: 1 })
    .withMessage("L'id du créateur doit être un entier positif"),
  body("role_id")
    .isInt({ min: 1 })
    .withMessage("L'id du rôle doit être un entier positif")
];

const removeMediaFromCreatorValidators = [
  body("media_id")
    .isInt({ min: 1 })
    .withMessage("L'id du média doit être un entier positif"),
  body("creator_id")
    .isInt({ min: 1 })
    .withMessage("L'id du créateur doit être un entier positif")
];

module.exports = {
  createMediaValidators,
  updateMediaValidators,
  addMediaToCreatorValidators,
  removeMediaFromCreatorValidators
};
