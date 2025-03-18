const { Router } = require("express");
const router = Router();

const mediasController = require("./medias.controller");

const idValidator = require("../../utils/id.validator");
const { createMediaValidators, updateMediaValidators, addMediaToCreatorValidators, removeMediaFromCreatorValidators } = require("./medias.validators");
const handleValidations = require("../../middlewares/handle.validations");
const handleImageUpload = require("../../middlewares/upload");

router.get("/type/:id", idValidator, handleValidations, mediasController.getMediasByType);

router.get("/creators/:id", idValidator, handleValidations, mediasController.getMediasByCreator);

router.post("/", handleImageUpload, createMediaValidators, handleValidations, mediasController.createMedia);

router.put("/:id", updateMediaValidators, handleValidations, mediasController.updateMedia);

router.delete("/:id", idValidator, handleValidations, mediasController.deleteMedia);

router.post("/add-to-creator", addMediaToCreatorValidators, handleValidations, mediasController.addMediaToCreator);

router.delete("/remove-from-creator", removeMediaFromCreatorValidators, handleValidations, mediasController.removeMediaFromCreator);

module.exports = router;
