const typesController = require("./types.controller");
const typesService = require("./types.service");
const responseHandler = require("../../utils/response.handler");

jest.mock("./types.service");
jest.mock("../../utils/response.handler");

// Mock types data
const mockType = {
  id: 1,
  name: "Type 1"
};

const mockType2 = {
  id: 2,
  name: "Type 2"
};

describe("Test Types Controller", () => {
  // Clear mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  describe("getTypes", () => {
    it("should return a list of types with status 200", async () => {
      const mockTypes = [mockType, mockType2];
      typesService.getTypes.mockResolvedValue(mockTypes);

      await typesController.getTypes({}, {});

      expect(typesService.getTypes).toHaveBeenCalled();
      expect(responseHandler).toHaveBeenCalledWith({}, 200, "Types récupérés avec succès", mockTypes);
    });

    it("should return an error with status 500", async () => {
      const mockError = new Error("Database error");
      typesService.getTypes.mockRejectedValue(mockError);

      await typesController.getTypes({}, {});

      expect(typesService.getTypes).toHaveBeenCalled();
      expect(responseHandler).toHaveBeenCalledWith({}, 500, "Une erreur est survenue lors de la récupération des types", null, mockError);
    });
  });

  describe("createType", () => {
    it("should return the new type with status 201", async () => {
      const mockReq = { body: { name: "Type 1" } };
      typesService.createType.mockResolvedValue(mockType);

      await typesController.createType(mockReq, {}); 

      expect(typesService.createType).toHaveBeenCalledWith(mockReq.body);
      expect(responseHandler).toHaveBeenCalledWith({}, 201, "Type créé avec succès", mockType);
    });

    it("should return an error with status 500", async () => {
      const mockReq = { body: { name: "Type 1" } };
      const mockError = new Error("Database error");
      typesService.createType.mockRejectedValue(mockError); 

      await typesController.createType(mockReq, {}); 

      expect(typesService.createType).toHaveBeenCalledWith(mockReq.body);
      expect(responseHandler).toHaveBeenCalledWith({}, 500, "Une erreur est survenue lors de la création du type", null, mockError);
    });
  });

  describe("updateType", () => {
    it("should return the updated type with status 200", async () => {
      const mockReq = { params: { id: 1 }, body: { name: "Type 1" } };
      typesService.updateType.mockResolvedValue(mockType);

      await typesController.updateType(mockReq, {});

      expect(typesService.updateType).toHaveBeenCalledWith(mockReq.params.id, mockReq.body);
      expect(responseHandler).toHaveBeenCalledWith({}, 200, "Type mis à jour avec succès", mockType);
    });

    it("should return an error with status 400 if no data provided", async () => {
      const mockReq = { params: { id: 1 } };

      await typesController.updateType(mockReq, {});

      expect(typesService.updateType).not.toHaveBeenCalled();
      expect(responseHandler).toHaveBeenCalledWith({}, 400, "Données manquantes");
    });

    it("should return an error with status 404 if type is not found", async () => {
      const mockReq = { params: { id: 99 }, body: { name: "Type 1" } };
      typesService.updateType.mockResolvedValue(null);

      await typesController.updateType(mockReq, {});

      expect(typesService.updateType).toHaveBeenCalledWith(mockReq.params.id, mockReq.body);
      expect(responseHandler).toHaveBeenCalledWith({}, 404, "Type non trouvé");
    });

    it("should return an error with status 500", async () => {
      const mockReq = { params: { id: 1 }, body: { name: "Type 1" } };
      const mockError = new Error("Database error");
      typesService.updateType.mockRejectedValue(mockError);

      await typesController.updateType(mockReq, {});

      expect(typesService.updateType).toHaveBeenCalledWith(mockReq.params.id, mockReq.body);
      expect(responseHandler).toHaveBeenCalledWith({}, 500, "Une erreur est survenue lors de la mise à jour du type", null, mockError);
    });
  });

  describe("deleteType", () => {
    it("should return status 200", async () => {
      const mockReq = { params: { id: 1 } };
      typesService.deleteType.mockResolvedValue(true);

      await typesController.deleteType(mockReq, {});

      expect(typesService.deleteType).toHaveBeenCalledWith(mockReq.params.id);
      expect(responseHandler).toHaveBeenCalledWith({}, 200, "Type supprimé avec succès");
    });

    it("should return an error with status 404 if type is not found", async () => {
      const mockReq = { params: { id: 99 } };
      typesService.deleteType.mockResolvedValue(false);

      await typesController.deleteType(mockReq, {}); 

      expect(typesService.deleteType).toHaveBeenCalledWith(mockReq.params.id);
      expect(responseHandler).toHaveBeenCalledWith({}, 404, "Type non trouvé");
    });

    it("should return an error with status 500", async () => {
      const mockReq = { params: { id: 1 } };
      const mockError = new Error("Database error");
      typesService.deleteType.mockRejectedValue(mockError);

      await typesController.deleteType(mockReq, {}); 

      expect(typesService.deleteType).toHaveBeenCalledWith(mockReq.params.id);
      expect(responseHandler).toHaveBeenCalledWith({}, 500, "Une erreur est survenue lors de la suppression du type", null, mockError);
    });
  });
});
