const pool = require("../../config/database");
const typesService = require("./types.service");

jest.mock("../../config/database"); // Mock the database

// Mock types data
const mockType = {
  id: 1,
  name: "Type 1"
};

const mockType2 = {
  id: 2,
  name: "Type 2"
};

describe("Test Types Service", () => {
  // Clear mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getTypes", () => {
    it("should return an array of all types", async () => {
      const mockData = [mockType, mockType2];
      pool.execute.mockResolvedValue([mockData]);

      const types = await typesService.getTypes();
      const query = "SELECT * FROM Types";

      expect(pool.execute).toHaveBeenCalledWith(query);
      expect(types).toEqual(mockData);
    });
  });

  describe("createType", () => {
    it("should create a type and return the created type", async () => {
      const typeData = { name: "Type 1" };
      const mockResult = { insertId: 1 };
      pool.execute.mockResolvedValue([mockResult]);

      const type = await typesService.createType(typeData);
      const query = "INSERT INTO Types (name) VALUES (?)";

      expect(pool.execute).toHaveBeenCalledWith(query, [typeData.name]);
      expect(type).toEqual({ id: 1, ...typeData });
    });
  });

  describe("updateType", () => {
    it("should update the type and return the updated type", async () => {
      const id = 1;
      const typeData = { name: "Type 1" };
      const mockResult = { affectedRows: 1 };
      pool.execute.mockResolvedValue([mockResult]);

      const type = await typesService.updateType(id, typeData);
      const query = "UPDATE Types SET name = ? WHERE id = ?";

      expect(pool.execute).toHaveBeenCalledWith(query, [typeData.name, id]);
      expect(type).toEqual({ id, ...typeData });
    });

    it("should return null if the type is not found", async () => {
      const id = 99;
      const typeData = { name: "Type 1" };
      const mockResult = { affectedRows: 0 };
      pool.execute.mockResolvedValue([mockResult]);

      const type = await typesService.updateType(id, typeData);
      const query = "UPDATE Types SET name = ? WHERE id = ?";

      expect(pool.execute).toHaveBeenCalledWith(query, [typeData.name, id]);
      expect(type).toBeNull();
    });
  });

  describe("deleteType", () => {
    it("should delete the type and return true", async () => {
      const id = 1;
      const mockResult = { affectedRows: 1 };
      pool.execute.mockResolvedValue([mockResult]);

      const result = await typesService.deleteType(id);
      const query = "DELETE FROM Types WHERE id = ?";

      expect(pool.execute).toHaveBeenCalledWith(query, [id]);
      expect(result).toBe(true);
    });

    it("should return false if the type is not found", async () => {
      const id = 99;
      const mockResult = { affectedRows: 0 };
      pool.execute.mockResolvedValue([mockResult]);

      const result = await typesService.deleteType(id);
      const query = "DELETE FROM Types WHERE id = ?";

      expect(pool.execute).toHaveBeenCalledWith(query, [id]);
      expect(result).toBe(false);
    });
  });
});
