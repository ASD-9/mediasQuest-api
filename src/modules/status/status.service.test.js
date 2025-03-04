const pool = require("../../config/database");
const statusService = require("./status.service");

jest.mock("../../config/database"); // Mock the database

// Mock status data
const mockStatus = {
  id: 1,
  name: "Status 1"
};

const mockStatus2 = {
  id: 2,
  name: "Status 2"
};

describe("Test Status Service", () => {
  // Clear mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getStatus", () => {
    it("should return an array of all status", async () => {
      const mockData = [mockStatus, mockStatus2];
      pool.execute.mockResolvedValue([mockData]);

      const status = await statusService.getStatus();
      const query = "SELECT * FROM Status";

      expect(pool.execute).toHaveBeenCalledWith(query);
      expect(status).toEqual(mockData);
    });
  });

  describe("createStatus", () => {
    it("should create a status and return the created status", async () => {
      const statusData = { name: "Status 1" };
      const mockResult = { insertId: 1 };
      pool.execute.mockResolvedValue([mockResult]);

      const status = await statusService.createStatus(statusData);
      const query = "INSERT INTO Status (name) VALUES (?)";

      expect(pool.execute).toHaveBeenCalledWith(query, [statusData.name]);
      expect(status).toEqual({ id: 1, ...statusData });
    });
  });

  describe("updateStatus", () => {
    it("should update the status and return the updated status", async () => {
      const id = 1;
      const statusData = { name: "Status 1" };
      const mockResult = { affectedRows: 1 };
      pool.execute.mockResolvedValue([mockResult]);

      const status = await statusService.updateStatus(id, statusData);
      const query = "UPDATE Status SET name = ? WHERE id = ?";

      expect(pool.execute).toHaveBeenCalledWith(query, [statusData.name, id]);
      expect(status).toEqual({ id, ...statusData });
    });

    it("should return null if the status is not found", async () => {
      const id = 99;
      const statusData = { name: "Status 1" };
      const mockResult = { affectedRows: 0 };
      pool.execute.mockResolvedValue([mockResult]);

      const status = await statusService.updateStatus(id, statusData);
      const query = "UPDATE Status SET name = ? WHERE id = ?";

      expect(pool.execute).toHaveBeenCalledWith(query, [statusData.name, id]);
      expect(status).toBeNull();
    });
  });

  describe("deleteStatus", () => {
    it("should delete the status and return true", async () => {
      const id = 1;
      const mockResult = { affectedRows: 1 };
      pool.execute.mockResolvedValue([mockResult]);

      const result = await statusService.deleteStatus(id);
      const query = "DELETE FROM Status WHERE id = ?";

      expect(pool.execute).toHaveBeenCalledWith(query, [id]);
      expect(result).toBe(true);
    });

    it("should return false if the status is not found", async () => {
      const id = 99;
      const mockResult = { affectedRows: 0 };
      pool.execute.mockResolvedValue([mockResult]);

      const result = await statusService.deleteStatus(id);
      const query = "DELETE FROM Status WHERE id = ?";

      expect(pool.execute).toHaveBeenCalledWith(query, [id]);
      expect(result).toBe(false);
    });
  });
});
