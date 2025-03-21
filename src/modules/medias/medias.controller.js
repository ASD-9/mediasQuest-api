const mediasService = require("./medias.service");
const responseHandler = require("../../utils/response.handler");

const getMediasByType = async (req, res) => {
  try {
    const medias = await mediasService.getMediasByType(req.params.id);
    responseHandler(res, 200, "Médias récupérés avec succès", medias);
  } catch (error) {
    responseHandler(res, 500, "Une erreur est survenue lors de la récupération des médias", null, error);
  }
}

const getMediasByCreator = async (req, res) => {
  try {
    const medias = await mediasService.getMediasByCreator(req.params.creatorId, req.params.typeId);
    responseHandler(res, 200, "Médias récupérés avec succès", medias);
  } catch (error) {
    responseHandler(res, 500, "Une erreur est survenue lors de la récupération des médias", null, error);
  }
}

const createMedia = async (req, res) => {
  try {
    const media = await mediasService.createMedia(req.body);
    responseHandler(res, 201, "Média crée avec succès", media);
  } catch (error) {
    responseHandler(res, 500, "Une erreur est survenue lors de la création du média", null, error);
  }
}

const updateMedia = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return responseHandler(res, 400, "Données manquantes");
  }

  try {
    const media = await mediasService.updateMedia(req.params.id, req.body);
    if (!media) {
      responseHandler(res, 404, "Média non trouvé");
    } else {
      responseHandler(res, 200, "Média mis à jour avec succès", media);
    }
  } catch (error) {
    responseHandler(res, 500, "Une erreur est survenue lors de la mise à jour du média", null, error);
  }
}

const deleteMedia = async (req, res) => {
  try {
    const result = await mediasService.deleteMedia(req.params.id);
    if (!result) {
      responseHandler(res, 404, "Média non trouvé");
    } else {
      responseHandler(res, 200, "Média supprimé avec succès");
    }
  } catch (error) {
    responseHandler(res, 500, "Une erreur est survenue lors de la suppression du média", null, error);
  }
}

const addMediaToCreator = async (req, res) => {
  try {
    const media = await mediasService.addMediaToCreator(req.body);
    responseHandler(res, 200, "Média ajouté au créateur avec succès", media);
  } catch (error) {
    responseHandler(res, 500, "Une erreur est survenue lors de l'ajout du média au créateur", null, error);
  }
}

const removeMediaFromCreator = async (req, res) => {
  try {
    await mediasService.removeMediaFromCreator(req.body);
    responseHandler(res, 200, "Média retiré du créateur avec succès");
  } catch (error) {
    responseHandler(res, 500, "Une erreur est survenue lors du retrait du média au créateur", null, error);
  }
}

module.exports = {
  getMediasByType,
  getMediasByCreator,
  createMedia,
  updateMedia,
  deleteMedia,
  addMediaToCreator,
  removeMediaFromCreator
}
