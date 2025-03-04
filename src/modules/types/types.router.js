const { Router } = require("express");
const router = Router();

const typesController = require("./types.controller");

const idValidator = require("../../utils/id.validator");
const { createTypeValidators, updateTypeValidators } = require("./types.validators");
const handleValidations = require("../../middlewares/handle.validations");

router.get("/", typesController.getTypes);

router.post("/", updateTypeValidators, handleValidations, typesController.createType);

router.put("/:id", updateTypeValidators, handleValidations, typesController.updateType);

router.delete("/:id", idValidator, handleValidations, typesController.deleteType);

module.exports = router;
