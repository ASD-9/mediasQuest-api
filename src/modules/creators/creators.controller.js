const creatorsService = require("./creators.service");
const responseHandler = require("../../utils/response.handler");

const getCreatorsByType = async (req, res) => {
  try {
    const creators = await creatorsService.getCreatorsByType(req.params.id);
    responseHandler(res, 200, "Créateurs récupérés avec succès", creators);
  } catch (error) {
    responseHandler(res, 500, "Une erreur est survenue lors de la récupération des créateurs", null, error);
  }
};

const createCreator = async (req, res) => {
  try {
    const creator = await creatorsService.createCreator(req.body);
    responseHandler(res, 201, "Créateur créé avec succès", creator);
  } catch (error) {
    responseHandler(res, 500, "Une erreur est survenue lors de la création du créateur", null, error);
  }
};

const updateCreator = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return responseHandler(res, 400, "Données manquantes");
  }

  try {
    const creator = await creatorsService.updateCreator(req.params.id, req.body);
    if (!creator) {
      responseHandler(res, 404, "Créateur non trouvé");
    } else {
      responseHandler(res, 200, "Créateur mis à jour avec succès", creator);
    }
  } catch (error) {
    responseHandler(res, 500, "Une erreur est survenue lors de la mise à jour du créateur", null, error);
  }
};

const deleteCreator = async (req, res) => {
  try {
    const result = await creatorsService.deleteCreator(req.params.id);
    if (!result) {
      responseHandler(res, 404, "Créateur non trouvé");
    } else {
      responseHandler(res, 200, "Créateur supprimé avec succès");
    }
  } catch (error) {
    responseHandler(res, 500, "Une erreur est survenue lors de la suppression du créateur", null, error);
  }
};

module.exports = {
  getCreatorsByType,
  createCreator,
  updateCreator,
  deleteCreator
};
