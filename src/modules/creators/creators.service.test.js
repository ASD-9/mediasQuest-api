const pool = require("../../config/database");
const creatorsService = require("./creators.service");

jest.mock("../../config/database"); // Mock the database

// Mock creators data
const mockCreator = {
  id: 1,
  name: "Creator 1",
  medias_completed: 2,
  medias_not_completed: 3
};

const mockCreator2 = {
  id: 2,
  name: "Creator 2",
  medias_completed: 2,
  medias_not_completed: 3
};

describe("Test Creators Service", () => {
  // Clear mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getCreatorsByType", () => {
    it("should return an array of all creators", async () => {
      const mockData = [mockCreator, mockCreator2];
      pool.execute.mockResolvedValue([mockData]);

      const creators = await creatorsService.getCreatorsByType(1);
      const query = `
    SELECT
      c.*,
      COUNT(CASE WHEN s.name = 'completed' THEN m.id END) AS medias_completed
      COUNT(CASE WHEN s.name != 'completed' THEN m.id END) AS medias_not_completed
    FROM Creators c
    JOIN Creator_media cm ON c.id = cm.creator_id
    JOIN Medias m ON m.id = cm.media_id
    JOIN Types t ON t.id = m.type_id
    JOIN Status s ON s.id = m.status_id
    WHERE t.id = ?
    GROUP BY c.id
  `;

      expect(pool.execute).toHaveBeenCalledWith(query, [1]);
      expect(creators).toEqual(mockData);
    });
  });

  describe("createCreator", () => {
    it("should create a creator and return the created creator", async () => {
      const creatorData = { name: "Creator 1" };
      const mockResult = { insertId: 1 };
      pool.execute.mockResolvedValue([mockResult]);

      const creator = await creatorsService.createCreator(creatorData);
      const query = "INSERT INTO Creators (name) VALUES (?)";

      expect(pool.execute).toHaveBeenCalledWith(query, [creatorData.name]);
      expect(creator).toEqual({ id: 1, ...creatorData });
    });
  });

  describe("updateCreator", () => {
    it("should update the creator and return the updated creator", async () => {
      const id = 1;
      const creatorData = { name: "Creator 1" };
      const mockResult = { affectedRows: 1 };
      pool.execute.mockResolvedValue([mockResult]);

      const creator = await creatorsService.updateCreator(id, creatorData);
      const query = "UPDATE Creators SET name = ? WHERE id = ?";

      expect(pool.execute).toHaveBeenCalledWith(query, [creatorData.name, id]);
      expect(creator).toEqual({ id, ...creatorData });
    });

    it("should return null if the creator is not found", async () => {
      const id = 99;
      const creatorData = { name: "Creator 1" };
      const mockResult = { affectedRows: 0 };
      pool.execute.mockResolvedValue([mockResult]);

      const creator = await creatorsService.updateCreator(id, creatorData);
      const query = "UPDATE Creators SET name = ? WHERE id = ?";

      expect(pool.execute).toHaveBeenCalledWith(query, [creatorData.name, id]);
      expect(creator).toBeNull();
    });
  });

  describe("deleteCreator", () => {
    it("should delete the creator and return true", async () => {
      const id = 1;
      const mockResult = { affectedRows: 1 };
      pool.execute.mockResolvedValue([mockResult]);

      const result = await creatorsService.deleteCreator(id);
      const query = "DELETE FROM Creators WHERE id = ?";

      expect(pool.execute).toHaveBeenCalledWith(query, [id]);
      expect(result).toBe(true);
    });

    it("should return false if the creator is not found", async () => {
      const id = 99;
      const mockResult = { affectedRows: 0 };
      pool.execute.mockResolvedValue([mockResult]);

      const result = await creatorsService.deleteCreator(id);
      const query = "DELETE FROM Creators WHERE id = ?";

      expect(pool.execute).toHaveBeenCalledWith(query, [id]);
      expect(result).toBe(false);
    });
  });
});
