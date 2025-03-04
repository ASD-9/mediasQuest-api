const rolesService = require("./roles.service");
const responseHandler = require("../../utils/response.handler");

const getRoles = async (req, res) => {
  try {
    const roles = await rolesService.getRoles();
    responseHandler(res, 200, "Rôles récupérés avec succès", roles);
  } catch (error) {
    responseHandler(res, 500, "Une erreur est survenue lors de la récupération des rôles", null, error);
  }
};

const createRole = async (req, res) => {
  try {
    const role = await rolesService.createRole(req.body);
    responseHandler(res, 201, "Rôle créé avec succès", role);
  } catch (error) {
    responseHandler(res, 500, "Une erreur est survenue lors de la création du rôle", null, error);
  }
};

const updateRole = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return responseHandler(res, 400, "Données manquantes");
  }

  try {
    const role = await rolesService.updateRole(req.params.id, req.body);
    if (!role) {
      responseHandler(res, 404, "Rôle non trouvé");
    } else {
      responseHandler(res, 200, "Rôle mis à jour avec succès", role);
    }
  } catch (error) {
    responseHandler(res, 500, "Une erreur est survenue lors de la mise à jour du rôle", null, error);
  }
};

const deleteRole = async (req, res) => {
  try {
    const result = await rolesService.deleteRole(req.params.id);
    if (!result) {
      responseHandler(res, 404, "Rôle non trouvé");
    } else {
      responseHandler(res, 200, "Rôle supprimé avec succès");
    }
  } catch (error) {
    responseHandler(res, 500, "Une erreur est survenue lors de la suppression du rôle", null, error);
  }
};

module.exports = {
  getRoles,
  createRole,
  updateRole,
  deleteRole
};
