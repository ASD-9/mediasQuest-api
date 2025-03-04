const typesService = require("./types.service");
const responseHandler = require("../../utils/response.handler");

const getTypes = async (req, res) => {
  try {
    const types = await typesService.getTypes();
    responseHandler(res, 200, "Types récupérés avec succès", types);
  } catch (error) {
    responseHandler(res, 500, "Une erreur est survenue lors de la récupération des types", null, error);
  }
};

const createType = async (req, res) => {
  try {
    const type = await typesService.createType(req.body);
    responseHandler(res, 201, "Type créé avec succès", type);
  } catch (error) {
    responseHandler(res, 500, "Une erreur est survenue lors de la création du type", null, error);
  }
};

const updateType = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return responseHandler(res, 400, "Données manquantes");
  }

  try {
    const type = await typesService.updateType(req.params.id, req.body);
    if (!type) {
      responseHandler(res, 404, "Type non trouvé");
    } else {
      responseHandler(res, 200, "Type mis à jour avec succès", type);
    }
  } catch (error) {
    responseHandler(res, 500, "Une erreur est survenue lors de la mise à jour du type", null, error);
  }
};

const deleteType = async (req, res) => {
  try {
    const result = await typesService.deleteType(req.params.id);
    if (!result) {
      responseHandler(res, 404, "Type non trouvé");
    } else {
      responseHandler(res, 200, "Type supprimé avec succès");
    }
  } catch (error) {
    responseHandler(res, 500, "Une erreur est survenue lors de la suppression du type", null, error);
  }
};

module.exports = {
  getTypes,
  createType,
  updateType,
  deleteType
};
