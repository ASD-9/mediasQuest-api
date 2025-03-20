const statusController = require("./status.controller");
const statusService = require("./status.service");
const responseHandler = require("../../utils/response.handler");

jest.mock("./status.service");
jest.mock("../../utils/response.handler");

// Mock status data
const mockStatus = {
  id: 1,
  name: "Status 1"
};

const mockStatus2 = {
  id: 2,
  name: "Status 2"
};

describe("Test Status Controller", () => {
  // Clear mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  describe("getStatus", () => {
    it("should return a list of status with status 200", async () => {
      const mockStatusArray = [mockStatus, mockStatus2];
      statusService.getStatus.mockResolvedValue(mockStatusArray);

      await statusController.getStatus({}, {});

      expect(statusService.getStatus).toHaveBeenCalled();
      expect(responseHandler).toHaveBeenCalledWith({}, 200, "Status récupérés avec succès", mockStatusArray);
    });

    it("should return an error with status 500", async () => {
      const mockError = new Error("Database error");
      statusService.getStatus.mockRejectedValue(mockError);

      await statusController.getStatus({}, {});

      expect(statusService.getStatus).toHaveBeenCalled();
      expect(responseHandler).toHaveBeenCalledWith({}, 500, "Une erreur est survenue lors de la récupération des status", null, mockError);
    });
  });

  describe("createStatus", () => {
    it("should return the new status with status 201", async () => {
      const mockReq = { body: { name: "Status 1" } };
      statusService.createStatus.mockResolvedValue(mockStatus);

      await statusController.createStatus(mockReq, {}); 

      expect(statusService.createStatus).toHaveBeenCalledWith(mockReq.body);
      expect(responseHandler).toHaveBeenCalledWith({}, 201, "Status créé avec succès", mockStatus);
    });

    it("should return an error with status 500", async () => {
      const mockReq = { body: { name: "Status 1" } };
      const mockError = new Error("Database error");
      statusService.createStatus.mockRejectedValue(mockError); 

      await statusController.createStatus(mockReq, {}); 

      expect(statusService.createStatus).toHaveBeenCalledWith(mockReq.body);
      expect(responseHandler).toHaveBeenCalledWith({}, 500, "Une erreur est survenue lors de la création du status", null, mockError);
    });
  });

  describe("updateStatus", () => {
    it("should return the updated status with status 200", async () => {
      const mockReq = { params: { id: 1 }, body: { name: "Status 1" } };
      statusService.updateStatus.mockResolvedValue(mockStatus);

      await statusController.updateStatus(mockReq, {});

      expect(statusService.updateStatus).toHaveBeenCalledWith(mockReq.params.id, mockReq.body);
      expect(responseHandler).toHaveBeenCalledWith({}, 200, "Status mis à jour avec succès", mockStatus);
    });

    it("should return an error with status 400 if no data provided", async () => {
      const mockReq = { params: { id: 1 } };

      await statusController.updateStatus(mockReq, {});

      expect(statusService.updateStatus).not.toHaveBeenCalled();
      expect(responseHandler).toHaveBeenCalledWith({}, 400, "Données manquantes");
    });

    it("should return an error with status 404 if status is not found", async () => {
      const mockReq = { params: { id: 99 }, body: { name: "Status 1" } };
      statusService.updateStatus.mockResolvedValue(null);

      await statusController.updateStatus(mockReq, {});

      expect(statusService.updateStatus).toHaveBeenCalledWith(mockReq.params.id, mockReq.body);
      expect(responseHandler).toHaveBeenCalledWith({}, 404, "Status non trouvé");
    });

    it("should return an error with status 500", async () => {
      const mockReq = { params: { id: 1 }, body: { name: "Status 1" } };
      const mockError = new Error("Database error");
      statusService.updateStatus.mockRejectedValue(mockError);

      await statusController.updateStatus(mockReq, {});

      expect(statusService.updateStatus).toHaveBeenCalledWith(mockReq.params.id, mockReq.body);
      expect(responseHandler).toHaveBeenCalledWith({}, 500, "Une erreur est survenue lors de la mise à jour du status", null, mockError);
    });
  });

  describe("deleteStatus", () => {
    it("should return status 200", async () => {
      const mockReq = { params: { id: 1 } };
      statusService.deleteStatus.mockResolvedValue(true);

      await statusController.deleteStatus(mockReq, {});

      expect(statusService.deleteStatus).toHaveBeenCalledWith(mockReq.params.id);
      expect(responseHandler).toHaveBeenCalledWith({}, 200, "Status supprimé avec succès");
    });

    it("should return an error with status 404 if status is not found", async () => {
      const mockReq = { params: { id: 99 } };
      statusService.deleteStatus.mockResolvedValue(false);

      await statusController.deleteStatus(mockReq, {}); 

      expect(statusService.deleteStatus).toHaveBeenCalledWith(mockReq.params.id);
      expect(responseHandler).toHaveBeenCalledWith({}, 404, "Status non trouvé");
    });

    it("should return an error with status 500", async () => {
      const mockReq = { params: { id: 1 } };
      const mockError = new Error("Database error");
      statusService.deleteStatus.mockRejectedValue(mockError);

      await statusController.deleteStatus(mockReq, {}); 

      expect(statusService.deleteStatus).toHaveBeenCalledWith(mockReq.params.id);
      expect(responseHandler).toHaveBeenCalledWith({}, 500, "Une erreur est survenue lors de la suppression du status", null, mockError);
    });
  });
});
