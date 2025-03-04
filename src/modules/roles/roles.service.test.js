const pool = require("../../config/database");
const rolesService = require("./roles.service");

jest.mock("../../config/database"); // Mock the database

// Mock roles data
const mockRole = {
  id: 1,
  name: "Role 1"
};

const mockRole2 = {
  id: 2,
  name: "Role 2"
};

describe("Test Roles Service", () => {
  // Clear mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getRoles", () => {
    it("should return an array of all roles", async () => {
      const mockData = [mockRole, mockRole2];
      pool.execute.mockResolvedValue([mockData]);

      const roles = await rolesService.getRoles();
      const query = "SELECT * FROM Roles";

      expect(pool.execute).toHaveBeenCalledWith(query);
      expect(roles).toEqual(mockData);
    });
  });

  describe("createRole", () => {
    it("should create a role and return the created role", async () => {
      const roleData = { name: "Role 1" };
      const mockResult = { insertId: 1 };
      pool.execute.mockResolvedValue([mockResult]);

      const role = await rolesService.createRole(roleData);
      const query = "INSERT INTO Roles (name) VALUES (?)";

      expect(pool.execute).toHaveBeenCalledWith(query, [roleData.name]);
      expect(role).toEqual({ id: 1, ...roleData });
    });
  });

  describe("updateRole", () => {
    it("should update the role and return the updated role", async () => {
      const id = 1;
      const roleData = { name: "Role 1" };
      const mockResult = { affectedRows: 1 };
      pool.execute.mockResolvedValue([mockResult]);

      const role = await rolesService.updateRole(id, roleData);
      const query = "UPDATE Roles SET name = ? WHERE id = ?";

      expect(pool.execute).toHaveBeenCalledWith(query, [roleData.name, id]);
      expect(role).toEqual({ id, ...roleData });
    });

    it("should return null if the role is not found", async () => {
      const id = 99;
      const roleData = { name: "Role 1" };
      const mockResult = { affectedRows: 0 };
      pool.execute.mockResolvedValue([mockResult]);

      const role = await rolesService.updateRole(id, roleData);
      const query = "UPDATE Roles SET name = ? WHERE id = ?";

      expect(pool.execute).toHaveBeenCalledWith(query, [roleData.name, id]);
      expect(role).toBeNull();
    });
  });

  describe("deleteRole", () => {
    it("should delete the role and return true", async () => {
      const id = 1;
      const mockResult = { affectedRows: 1 };
      pool.execute.mockResolvedValue([mockResult]);

      const result = await rolesService.deleteRole(id);
      const query = "DELETE FROM Roles WHERE id = ?";

      expect(pool.execute).toHaveBeenCalledWith(query, [id]);
      expect(result).toBe(true);
    });

    it("should return false if the role is not found", async () => {
      const id = 99;
      const mockResult = { affectedRows: 0 };
      pool.execute.mockResolvedValue([mockResult]);

      const result = await rolesService.deleteRole(id);
      const query = "DELETE FROM Roles WHERE id = ?";

      expect(pool.execute).toHaveBeenCalledWith(query, [id]);
      expect(result).toBe(false);
    });
  });
});
