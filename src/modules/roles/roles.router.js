const { Router } = require("express");
const router = Router();

const rolesController = require("./roles.controller");

const idValidator = require("../../utils/id.validator");
const { createRoleValidators, updateRoleValidators } = require("./roles.validators");
const handleValidations = require("../../middlewares/handle.validations");

router.get("/", rolesController.getRoles);

router.post("/", createRoleValidators, handleValidations, rolesController.createRole);

router.put("/:id", updateRoleValidators, handleValidations, rolesController.updateRole);

router.delete("/:id", idValidator, handleValidations, rolesController.deleteRole);

module.exports = router;
