const mediasController = require("./medias.controller");
const mediasService = require("./medias.service");
const responseHandler = require("../../utils/response.handler");

jest.mock("./medias.service");
jest.mock("../../utils/response.handler");

const mockMedia = {
  id: 1,
  name: "Media 1",
  status: {
    id: 1,
    name: "Status 1"
  },
  type: {
    id: 1,
    name: "Type 1"
  }
};

const mockMedia2 = {
  id: 2,
  name: "Media 2",
  status: {
    id: 2,
    name: "Status 2"
  },
  type: {
    id: 2,
    name: "Type 2"
  }
};

describe("Test Medias Controller", () => {
  // Clear mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getMediasByType", () => {
    it("should return a list of medias with status 200", async () => {
      const mockReq = { params: { id: 1 } };
      const mockMedias = [mockMedia, mockMedia2];
      mediasService.getMediasByType.mockResolvedValue(mockMedias);

      await mediasController.getMediasByType(mockReq, {});

      expect(mediasService.getMediasByType).toHaveBeenCalledWith(mockReq.params.id);
      expect(responseHandler).toHaveBeenCalledWith({}, 200, "Médias récupérés avec succès", mockMedias);
    });

    it("should return an error with status 500", async () => {
      const mockReq = { params: { id: 1 } };
      const mockError = new Error("Database error");
      mediasService.getMediasByType.mockRejectedValue(mockError);

      await mediasController.getMediasByType(mockReq, {});

      expect(mediasService.getMediasByType).toHaveBeenCalledWith(mockReq.params.id);
      expect(responseHandler).toHaveBeenCalledWith({}, 500, "Une erreur est survenue lors de la récupération des médias", null, mockError);
    });
  });

  describe("getMediasByCreator", () => {
    it("should return a list of medias with status 200", async () => {
      const mockReq = { params: { id: 1 } };
      const mockMedias = [mockMedia, mockMedia2];
      mediasService.getMediasByCreator.mockResolvedValue(mockMedias);

      await mediasController.getMediasByCreator(mockReq, {});

      expect(mediasService.getMediasByCreator).toHaveBeenCalledWith(mockReq.params.id);
      expect(responseHandler).toHaveBeenCalledWith({}, 200, "Médias récupérés avec succès", mockMedias);
    });

    it("should return an error with status 500", async () => {
      const mockReq = { params: { id: 1 } };
      const mockError = new Error("Database error");
      mediasService.getMediasByCreator.mockRejectedValue(mockError);

      await mediasController.getMediasByCreator(mockReq, {});

      expect(mediasService.getMediasByCreator).toHaveBeenCalledWith(mockReq.params.id);
      expect(responseHandler).toHaveBeenCalledWith({}, 500, "Une erreur est survenue lors de la récupération des médias", null, mockError);
    });
  });

  describe("createMedia", () => {
    it("should return the new media with status 201", async () => {
      const mockReq = { body: {
        name: "Media 1",
        status_id: 1,
        type_id: 1
      }};
      mediasService.createMedia.mockResolvedValue(mockMedia);

      await mediasController.createMedia(mockReq, {});

      expect(mediasService.createMedia).toHaveBeenCalledWith(mockReq.body);
      expect(responseHandler).toHaveBeenCalledWith({}, 201, "Média crée avec succès", mockMedia);
    });

    it("should return an error with status 500", async () => {
      const mockReq = { body: {
        name: "Media 1",
        status_id: 1,
        type_id: 1
      }};
      const mockError = new Error("Database error");
      mediasService.createMedia.mockRejectedValue(mockError);

      await mediasController.createMedia(mockReq, {});

      expect(mediasService.createMedia).toHaveBeenCalledWith(mockReq.body);
      expect(responseHandler).toHaveBeenCalledWith({}, 500, "Une erreur est survenue lors de la création du média", null, mockError);
    });
  });

  describe("updateMedia", () => {
    it("should return the updated media with status 200", async () => {
      const mockReq = { params: { id: 1 }, body: { name: "Media 2" } };
      mediasService.updateMedia.mockResolvedValue(mockMedia2);

      await mediasController.updateMedia(mockReq, {});

      expect(mediasService.updateMedia).toHaveBeenCalledWith(mockReq.params.id, mockReq.body);
      expect(responseHandler).toHaveBeenCalledWith({}, 200, "Média mis à jour avec succès", mockMedia2);
    });

    it("should return an error with status 400 if no data provided", async () => {
      const mockReq = { params: { id: 1 }, body: {} };

      await mediasController.updateMedia(mockReq, {});

      expect(mediasService.updateMedia).not.toHaveBeenCalled();
      expect(responseHandler).toHaveBeenCalledWith({}, 400, "Données manquantes");
    });

    it("should return an error with status 404 if media not found", async () => {
      const mockReq = { params: { id: 99 }, body: { name: "Media 2" } };
      mediasService.updateMedia.mockResolvedValue(null);

      await mediasController.updateMedia(mockReq, {});

      expect(mediasService.updateMedia).toHaveBeenCalledWith(mockReq.params.id, mockReq.body);
      expect(responseHandler).toHaveBeenCalledWith({}, 404, "Média non trouvé");
    });

    it("should return an error with status 500", async () => {
      const mockReq = { params: { id: 1 }, body: { name: "Media 2" } };
      const mockError = new Error("Database error");
      mediasService.updateMedia.mockRejectedValue(mockError);

      await mediasController.updateMedia(mockReq, {});

      expect(mediasService.updateMedia).toHaveBeenCalledWith(mockReq.params.id, mockReq.body);
      expect(responseHandler).toHaveBeenCalledWith({}, 500, "Une erreur est survenue lors de la mise à jour du média", null, mockError);
    });
  });

  describe("deleteMedia", () => {
    it("should return status 200", async () => {
      const mockReq = { params: { id: 1 } };
      mediasService.deleteMedia.mockResolvedValue(true);

      await mediasController.deleteMedia(mockReq, {});

      expect(mediasService.deleteMedia).toHaveBeenCalledWith(mockReq.params.id);
      expect(responseHandler).toHaveBeenCalledWith({}, 200, "Média supprimé avec succès");
    });

    it("should return an error with status 404 if media not found", async () => {
      const mockReq = { params: { id: 99 } };
      mediasService.deleteMedia.mockResolvedValue(null);

      await mediasController.deleteMedia(mockReq, {});

      expect(mediasService.deleteMedia).toHaveBeenCalledWith(mockReq.params.id);
      expect(responseHandler).toHaveBeenCalledWith({}, 404, "Média non trouvé");
    });

    it("should return an error with status 500", async () => {
      const mockReq = { params: { id: 1 } };
      const mockError = new Error("Database error");
      mediasService.deleteMedia.mockRejectedValue(mockError);

      await mediasController.deleteMedia(mockReq, {});

      expect(mediasService.deleteMedia).toHaveBeenCalledWith(mockReq.params.id);
      expect(responseHandler).toHaveBeenCalledWith({}, 500, "Une erreur est survenue lors de la suppression du média", null, mockError);
    });
  });

  describe("addMediaToCreator", () => {
    it("should return the media with status 200", async () => {
      const mockReq = { body: {
        creator_id: 1,
        media_id: 1,
        role_id: 1
      } };
      mediasService.addMediaToCreator.mockResolvedValue(mockMedia);

      await mediasController.addMediaToCreator(mockReq, {});

      expect(mediasService.addMediaToCreator).toHaveBeenCalledWith(mockReq.body);
      expect(responseHandler).toHaveBeenCalledWith({}, 200, "Média ajouté au créateur avec succès", mockMedia);
    });

    it("should return an error with status 500", async () => {
      const mockReq = { body: {
        creator_id: 1,
        media_id: 1,
        role_id: 1
      } };
      const mockError = new Error("Database error");
      mediasService.addMediaToCreator.mockRejectedValue(mockError);

      await mediasController.addMediaToCreator(mockReq, {});

      expect(mediasService.addMediaToCreator).toHaveBeenCalledWith(mockReq.body);
      expect(responseHandler).toHaveBeenCalledWith({}, 500, "Une erreur est survenue lors de l'ajout du média au créateur", null, mockError);
    });
  });

  describe("removeMediaFromCreator", () => {
    it("should return status 200", async () => {
      const mockReq = { body: {
        creator_id: 1,
        media_id: 1
      } };
      mediasService.removeMediaFromCreator.mockResolvedValue(true);

      await mediasController.removeMediaFromCreator(mockReq, {});

      expect(mediasService.removeMediaFromCreator).toHaveBeenCalledWith(mockReq.body);
      expect(responseHandler).toHaveBeenCalledWith({}, 200, "Média retiré du créateur avec succès");
    });

    it("should return an error with status 500", async () => {
      const mockReq = { body: {
        creator_id: 1,
        media_id: 1
      } };
      const mockError = new Error("Database error");
      mediasService.removeMediaFromCreator.mockRejectedValue(mockError);

      await mediasController.removeMediaFromCreator(mockReq, {});

      expect(mediasService.removeMediaFromCreator).toHaveBeenCalledWith(mockReq.body);
      expect(responseHandler).toHaveBeenCalledWith({}, 500, "Une erreur est survenue lors du retrait du média au créateur", null, mockError);
    });
  });
});