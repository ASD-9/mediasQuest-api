const creatorsController = require("./creators.controller");
const creatorsService = require("./creators.service");
const responseHandler = require("../../utils/response.handler");

jest.mock("./creators.service");
jest.mock("../../utils/response.handler");

// Mock creators data
const mockCreator = {
  id: 1,
  name: "Creator 1"
};

const mockCreator1 = {
  id: 1,
  name: "Creator 1",
  medias_count: 2
}

const mockCreator2 = {
  id: 2,
  name: "Creator 2",
  medias_count: 5
};

describe("Test Creators Controller", () => {
  // Clear mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  describe("getCreatorsByType", () => {
    it("should return a list of creators with status 200", async () => {
      const mockReq = { params: { id: 1 } };
      const mockCreators = [mockCreator1, mockCreator2];
      creatorsService.getCreatorsByType.mockResolvedValue(mockCreators);

      await creatorsController.getCreatorsByType(mockReq, {});

      expect(creatorsService.getCreatorsByType).toHaveBeenCalledWith(mockReq.params.id);
      expect(responseHandler).toHaveBeenCalledWith({}, 200, "Créateurs récupérés avec succès", mockCreators);
    });

    it("should return an error with status 500", async () => {
      const mockReq = { params: { id: 1 } };
      const mockError = new Error("Database error");
      creatorsService.getCreatorsByType.mockRejectedValue(mockError);

      await creatorsController.getCreatorsByType(mockReq, {});

      expect(creatorsService.getCreatorsByType).toHaveBeenCalledWith(mockReq.params.id);
      expect(responseHandler).toHaveBeenCalledWith({}, 500, "Une erreur est survenue lors de la récupération des créateurs", null, mockError);
    });
  });

  describe("createCreator", () => {
    it("should return the new creator with status 201", async () => {
      const mockReq = { body: { name: "Creator 1" } };
      creatorsService.createCreator.mockResolvedValue(mockCreator);

      await creatorsController.createCreator(mockReq, {}); 

      expect(creatorsService.createCreator).toHaveBeenCalledWith(mockReq.body);
      expect(responseHandler).toHaveBeenCalledWith({}, 201, "Créateur créé avec succès", mockCreator);
    });

    it("should return an error with status 500", async () => {
      const mockReq = { body: { name: "Creator 1" } };
      const mockError = new Error("Database error");
      creatorsService.createCreator.mockRejectedValue(mockError); 

      await creatorsController.createCreator(mockReq, {}); 

      expect(creatorsService.createCreator).toHaveBeenCalledWith(mockReq.body);
      expect(responseHandler).toHaveBeenCalledWith({}, 500, "Une erreur est survenue lors de la création du créateur", null, mockError);
    });
  });

  describe("updateCreator", () => {
    it("should return the updated creator with status 200", async () => {
      const mockReq = { params: { id: 1 }, body: { name: "Creator 1" } };
      creatorsService.updateCreator.mockResolvedValue(mockCreator);

      await creatorsController.updateCreator(mockReq, {});

      expect(creatorsService.updateCreator).toHaveBeenCalledWith(mockReq.params.id, mockReq.body);
      expect(responseHandler).toHaveBeenCalledWith({}, 200, "Créateur mis à jour avec succès", mockCreator);
    });

    it("should return an error with status 400 if no data provided", async () => {
      const mockReq = { params: { id: 1 } };

      await creatorsController.updateCreator(mockReq, {});

      expect(creatorsService.updateCreator).not.toHaveBeenCalled();
      expect(responseHandler).toHaveBeenCalledWith({}, 400, "Données manquantes");
    });

    it("should return an error with status 404 if creator is not found", async () => {
      const mockReq = { params: { id: 99 }, body: { name: "Creator 1" } };
      creatorsService.updateCreator.mockResolvedValue(null);

      await creatorsController.updateCreator(mockReq, {});

      expect(creatorsService.updateCreator).toHaveBeenCalledWith(mockReq.params.id, mockReq.body);
      expect(responseHandler).toHaveBeenCalledWith({}, 404, "Créateur non trouvé");
    });

    it("should return an error with status 500", async () => {
      const mockReq = { params: { id: 1 }, body: { name: "Creator 1" } };
      const mockError = new Error("Database error");
      creatorsService.updateCreator.mockRejectedValue(mockError);

      await creatorsController.updateCreator(mockReq, {});

      expect(creatorsService.updateCreator).toHaveBeenCalledWith(mockReq.params.id, mockReq.body);
      expect(responseHandler).toHaveBeenCalledWith({}, 500, "Une erreur est survenue lors de la mise à jour du créateur", null, mockError);
    });
  });

  describe("deleteCreator", () => {
    it("should return status 200", async () => {
      const mockReq = { params: { id: 1 } };
      creatorsService.deleteCreator.mockResolvedValue(true);

      await creatorsController.deleteCreator(mockReq, {});

      expect(creatorsService.deleteCreator).toHaveBeenCalledWith(mockReq.params.id);
      expect(responseHandler).toHaveBeenCalledWith({}, 200, "Créateur supprimé avec succès");
    });

    it("should return an error with status 404 if creator is not found", async () => {
      const mockReq = { params: { id: 99 } };
      creatorsService.deleteCreator.mockResolvedValue(false);

      await creatorsController.deleteCreator(mockReq, {}); 

      expect(creatorsService.deleteCreator).toHaveBeenCalledWith(mockReq.params.id);
      expect(responseHandler).toHaveBeenCalledWith({}, 404, "Créateur non trouvé");
    });

    it("should return an error with status 500", async () => {
      const mockReq = { params: { id: 1 } };
      const mockError = new Error("Database error");
      creatorsService.deleteCreator.mockRejectedValue(mockError);

      await creatorsController.deleteCreator(mockReq, {}); 

      expect(creatorsService.deleteCreator).toHaveBeenCalledWith(mockReq.params.id);
      expect(responseHandler).toHaveBeenCalledWith({}, 500, "Une erreur est survenue lors de la suppression du créateur", null, mockError);
    });
  });
});
