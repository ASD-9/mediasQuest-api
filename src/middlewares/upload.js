const path = require("path");
const multer = require("multer");
const upload = require("../config/multer");
const responseHandler = require("../utils/response.handler");

const handleImageUpload = (req, res, next) => {
  const uploadSingle = upload.single("image");

  uploadSingle(req, res, (err) => {
    if (err) {
      let errorMessage = "Erreur serveur lors de l'upload.";

      if (err instanceof multer.MulterError) {
        errorMessage = err.code == "LIMIT_FILE_SIZE"
          ? "Le fichier dépasse la taille maximale autorisée (5 Mo)."
          : "Erreur lors de l'upload.";
      }

      return responseHandler(res, err instanceof multer.MulterError ? 400 : 500, errorMessage, null, err);
    }

    if (!req.file) {
      return responseHandler(res, 400, "Aucun fichier envoyé.", null, "Aucun fichier envoyé.");
    }

    next();
  });
}

module.exports = handleImageUpload;
