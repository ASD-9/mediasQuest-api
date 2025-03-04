const { Router } = require("express");
const router = Router();

const creatorsController = require("./creators.controller");

const idValidator = require("../../utils/id.validator");
const { createCreatorValidators, updateCreatorValidators } = require("./creators.validators");
const handleValidations = require("../../middlewares/handle.validations");

router.get("/:id", idValidator, handleValidations, creatorsController.getCreatorsByType);

router.post("/", createCreatorValidators, handleValidations, creatorsController.createCreator);

router.put("/:id", updateCreatorValidators, handleValidations, creatorsController.updateCreator);

router.delete("/:id", idValidator, handleValidations, creatorsController.deleteCreator);

module.exports = router;
