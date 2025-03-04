const { Router } = require("express");
const router = Router();

const statusController = require("./status.controller");

const idValidator = require("../../utils/id.validator");
const { createStatusValidators, updateStatusValidators } = require("./status.validators");
const handleValidations = require("../../middlewares/handle.validations");

router.get("/", statusController.getStatus);

router.post("/", createStatusValidators, handleValidations, statusController.createStatus);

router.put("/:id", updateStatusValidators, handleValidations, statusController.updateStatus);

router.delete("/:id", idValidator, handleValidations, statusController.deleteStatus);

module.exports = router;
