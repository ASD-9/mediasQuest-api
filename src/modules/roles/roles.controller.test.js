const rolesController = require("./roles.controller");
const rolesService = require("./roles.service");
const responseHandler = require("../../utils/response.handler");

jest.mock("./roles.service");
jest.mock("../../utils/response.handler");

// Mock roles data
const mockRole = {
  id: 1,
  name: "Role 1"
};

const mockRole2 = {
  id: 2,
  name: "Role 2"
};

describe("Test Roles Controller", () => {
  // Clear mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  describe("getRoles", () => {
    it("should return a list of roles with status 200", async () => {
      const mockRoles = [mockRole, mockRole2];
      rolesService.getRoles.mockResolvedValue(mockRoles);

      await rolesController.getRoles({}, {});

      expect(rolesService.getRoles).toHaveBeenCalled();
      expect(responseHandler).toHaveBeenCalledWith({}, 200, "Rôles récupérés avec succès", mockRoles);
    });

    it("should return an error with status 500", async () => {
      const mockError = new Error("Database error");
      rolesService.getRoles.mockRejectedValue(mockError);

      await rolesController.getRoles({}, {});

      expect(rolesService.getRoles).toHaveBeenCalled();
      expect(responseHandler).toHaveBeenCalledWith({}, 500, "Une erreur est survenue lors de la récupération des rôles", null, mockError);
    });
  });

  describe("createRole", () => {
    it("should return the new role with status 201", async () => {
      const mockReq = { body: { name: "Role 1" } };
      rolesService.createRole.mockResolvedValue(mockRole);

      await rolesController.createRole(mockReq, {}); 

      expect(rolesService.createRole).toHaveBeenCalledWith(mockReq.body);
      expect(responseHandler).toHaveBeenCalledWith({}, 201, "Rôle créé avec succès", mockRole);
    });

    it("should return an error with status 500", async () => {
      const mockReq = { body: { name: "Role 1" } };
      const mockError = new Error("Database error");
      rolesService.createRole.mockRejectedValue(mockError); 

      await rolesController.createRole(mockReq, {}); 

      expect(rolesService.createRole).toHaveBeenCalledWith(mockReq.body);
      expect(responseHandler).toHaveBeenCalledWith({}, 500, "Une erreur est survenue lors de la création du rôle", null, mockError);
    });
  });

  describe("updateRole", () => {
    it("should return the updated role with status 200", async () => {
      const mockReq = { params: { id: 1 }, body: { name: "Role 1" } };
      rolesService.updateRole.mockResolvedValue(mockRole);

      await rolesController.updateRole(mockReq, {});

      expect(rolesService.updateRole).toHaveBeenCalledWith(mockReq.params.id, mockReq.body);
      expect(responseHandler).toHaveBeenCalledWith({}, 200, "Rôle mis à jour avec succès", mockRole);
    });

    it("should return an error with status 400 if no data provided", async () => {
      const mockReq = { params: { id: 1 } };

      await rolesController.updateRole(mockReq, {});

      expect(rolesService.updateRole).not.toHaveBeenCalled();
      expect(responseHandler).toHaveBeenCalledWith({}, 400, "Données manquantes");
    });

    it("should return an error with status 404 if role is not found", async () => {
      const mockReq = { params: { id: 99 }, body: { name: "Role 1" } };
      rolesService.updateRole.mockResolvedValue(null);

      await rolesController.updateRole(mockReq, {});

      expect(rolesService.updateRole).toHaveBeenCalledWith(mockReq.params.id, mockReq.body);
      expect(responseHandler).toHaveBeenCalledWith({}, 404, "Rôle non trouvé");
    });

    it("should return an error with status 500", async () => {
      const mockReq = { params: { id: 1 }, body: { name: "Role 1" } };
      const mockError = new Error("Database error");
      rolesService.updateRole.mockRejectedValue(mockError);

      await rolesController.updateRole(mockReq, {});

      expect(rolesService.updateRole).toHaveBeenCalledWith(mockReq.params.id, mockReq.body);
      expect(responseHandler).toHaveBeenCalledWith({}, 500, "Une erreur est survenue lors de la mise à jour du rôle", null, mockError);
    });
  });

  describe("deleteRole", () => {
    it("should return status 200", async () => {
      const mockReq = { params: { id: 1 } };
      rolesService.deleteRole.mockResolvedValue(true);

      await rolesController.deleteRole(mockReq, {});

      expect(rolesService.deleteRole).toHaveBeenCalledWith(mockReq.params.id);
      expect(responseHandler).toHaveBeenCalledWith({}, 200, "Rôle supprimé avec succès");
    });

    it("should return an error with status 404 if role is not found", async () => {
      const mockReq = { params: { id: 99 } };
      rolesService.deleteRole.mockResolvedValue(false);

      await rolesController.deleteRole(mockReq, {}); 

      expect(rolesService.deleteRole).toHaveBeenCalledWith(mockReq.params.id);
      expect(responseHandler).toHaveBeenCalledWith({}, 404, "Rôle non trouvé");
    });

    it("should return an error with status 500", async () => {
      const mockReq = { params: { id: 1 } };
      const mockError = new Error("Database error");
      rolesService.deleteRole.mockRejectedValue(mockError);

      await rolesController.deleteRole(mockReq, {}); 

      expect(rolesService.deleteRole).toHaveBeenCalledWith(mockReq.params.id);
      expect(responseHandler).toHaveBeenCalledWith({}, 500, "Une erreur est survenue lors de la suppression du rôle", null, mockError);
    });
  });
});
