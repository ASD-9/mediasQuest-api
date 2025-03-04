const statusService = require("./status.service");
const responseHandler = require("../../utils/response.handler");

const getStatus = async (req, res) => {
  try {
    const status = await statusService.getStatus();
    responseHandler(res, 200, "Status récupérés avec succès", status);
  } catch (error) {
    responseHandler(res, 500, "Une erreur est survenue lors de la récupération des status", null, error);
  }
};

const createStatus = async (req, res) => {
  try {
    const status = await statusService.createStatus(req.body);
    responseHandler(res, 201, "Status créé avec succès", status);
  } catch (error) {
    responseHandler(res, 500, "Une erreur est survenue lors de la création du status", null, error);
  }
};

const updateStatus = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return responseHandler(res, 400, "Données manquantes");
  }

  try {
    const status = await statusService.updateStatus(req.params.id, req.body);
    if (!status) {
      responseHandler(res, 404, "Status non trouvé");
    } else {
      responseHandler(res, 200, "Status mis à jour avec succès", status);
    }
  } catch (error) {
    responseHandler(res, 500, "Une erreur est survenue lors de la mise à jour du status", null, error);
  }
};

const deleteStatus = async (req, res) => {
  try {
    const result = await statusService.deleteStatus(req.params.id);
    if (!result) {
      responseHandler(res, 404, "Status non trouvé");
    } else {
      responseHandler(res, 200, "Status supprimé avec succès");
    }
  } catch (error) {
    responseHandler(res, 500, "Une erreur est survenue lors de la suppression du status", null, error);
  }
};

module.exports = {
  getStatus,
  createStatus,
  updateStatus,
  deleteStatus
};
