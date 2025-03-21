const pool = require("../../config/database");
const mediasService = require("./medias.service");

jest.mock("../../config/database"); // Mock the database

// Mock medias data
const mockMedia = {
  id: 1,
  name: "Media 1",
  status_id: 1,
  type_id: 1,
  status_name: "Status 1",
  type_name: "Type 1"
};

const formatedMediaData = {
  id: 1,
  name: "Media 1",
  status: {
    id: 1,
    name: "Status 1"
  },
  type: {
    id: 1,
    name: "Type 1"
  },
  role: {}
};

const mockMediaWithRole = {
  id: 2,
  name: "Media 2",
  status_id: 1,
  type_id: 1,
  status_name: "Status 1",
  type_name: "Type 1",
  role_id: 1,
  role_name: "Role 1"
};

const formatedMediaDataWithRole = {
  id: 2,
  name: "Media 2",
  status: {
    id: 1,
    name: "Status 1"
  },
  type: {
    id: 1,
    name: "Type 1"
  },
  role: {
    id: 1,
    name: "Role 1"
  }
};

describe("Test Medias Service", () => {
  // Clear mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getMediasByType", () => {
    it("should return an array of medias for a specific type", async () => {
      const mockData = [mockMedia];
      pool.execute.mockResolvedValue([mockData]);

      const medias = await mediasService.getMediasByType(1);
      const query = `
    SELECT
      m.*,
      s.name as status_name,
      t.name as type_name
    FROM Medias m
    JOIN Status s ON s.id = m.status_id
    JOIN Types t ON t.id = m.type_id
    WHERE m.type_id = ?
  `;

      expect(pool.execute).toHaveBeenCalledWith(query, [1]);
      expect(medias).toEqual([formatedMediaData]);
    });
  });

  describe("getMediasByCreator", () => {
    it("should return an array of medias for a specific creator", async () => {
      const mockData = [mockMediaWithRole];
      pool.execute.mockResolvedValue([mockData]);

      const medias = await mediasService.getMediasByCreator(1, 1);
      const query = `
    SELECT
      m.*,
      s.name as status_name,
      t.name as type_name,
      cm.role_id,
      r.name as role_name
    FROM Medias m
    JOIN Status s ON s.id = m.status_id
    JOIN Types t ON t.id = m.type_id
    JOIN Creator_media cm ON cm.media_id = m.id
    JOIN Roles r ON r.id = cm.role_id
    WHERE cm.creator_id = ? AND m.type_id = ?
  `;

      expect(pool.execute).toHaveBeenCalledWith(query, [1, 1]);
      expect(medias).toEqual([formatedMediaDataWithRole]);
    });
  });

  describe("getMediaById", () => {
    it("should return a media based on the id", async () => {
      pool.execute.mockResolvedValue([[mockMedia]]);

      const media = await mediasService.getMediaById(1);
      const query = `
    SELECT
      m.*,
      s.name as status_name,
      t.name as type_name
    FROM Medias m
    JOIN Status s ON s.id = m.status_id
    JOIN Types t ON t.id = m.type_id
    WHERE m.id = ?
  `;

      expect(pool.execute).toHaveBeenCalledWith(query, [1]);
      expect(media).toEqual(formatedMediaData);
    });

    it("should return null if the media is not found", async () => {
      pool.execute.mockResolvedValue([[]]);

      const media = await mediasService.getMediaById(1);
      const query = `
    SELECT
      m.*,
      s.name as status_name,
      t.name as type_name
    FROM Medias m
    JOIN Status s ON s.id = m.status_id
    JOIN Types t ON t.id = m.type_id
    WHERE m.id = ?
  `;

      expect(pool.execute).toHaveBeenCalledWith(query, [1]);
      expect(media).toBeNull();
    });
  });

  describe("createMedia", () => {
    it("should create a new media and return it", async () => {
      const mediaData = {
        name: "Media 1",
        status_id: 1,
        type_id: 1
      };
      const mockResult = { insertId: 1 };
      pool.execute
        .mockResolvedValueOnce([mockResult])
        .mockResolvedValueOnce([[mockMedia]]);

      const media = await mediasService.createMedia(mediaData);
      const query = "INSERT INTO Medias (name, status_id, type_id) VALUES (?, ?, ?)";

      expect(pool.execute).toHaveBeenCalledWith(query, [mediaData.name, mediaData.status_id, mediaData.type_id]);
      expect(media).toEqual(formatedMediaData);
    });
  });

  describe("updateMedia", () => {
    it("should update the specified fields of the media and return the updated media", async () => {
      const mediaData = {
        name: "Media 1"
      };
      const mockResult = { affectedRows: 1 };
      pool.execute
        .mockResolvedValueOnce([mockResult])
        .mockResolvedValueOnce([[mockMedia]]);

      const media = await mediasService.updateMedia(1, mediaData);
      const query = `UPDATE Medias SET name = ? WHERE id = ?`;

      expect(pool.execute).toHaveBeenCalledWith(query, [mediaData.name, 1]);
      expect(media).toEqual(formatedMediaData);
    });

    it("should return null if the media is not found", async () => {
      const mediaData = {
        name: "Media 2"
      };
      const mockResult = { affectedRows: 0 };
      pool.execute.mockResolvedValue([mockResult]);

      const media = await mediasService.updateMedia(99, mediaData);
      const query = `UPDATE Medias SET name = ? WHERE id = ?`;

      expect(pool.execute).toHaveBeenCalledWith(query, [mediaData.name, 99]);
      expect(media).toBeNull();
    });
  });

  describe("deleteMedia", () => {
    it("should delete the media", async () => {
      const mockResult = { affectedRows: 1 };
      pool.execute.mockResolvedValue([mockResult]);

      const result = await mediasService.deleteMedia(1);
      const query = "DELETE FROM Medias WHERE id = ?";

      expect(pool.execute).toHaveBeenCalledWith(query, [1]);
      expect(result).toEqual(true);
    });

    it("should return null if the media is not found", async () => {
      const mockResult = { affectedRows: 0 };
      pool.execute.mockResolvedValue([mockResult]);

      const result = await mediasService.deleteMedia(99);
      const query = "DELETE FROM Medias WHERE id = ?";

      expect(pool.execute).toHaveBeenCalledWith(query, [99]);
      expect(result).toEqual(false);
    });
  });

  describe("addMediaToCreator", () => {
    it("should create the relation between the creator and the media and return the media", async () => {
      const mockData = {
        creator_id: 1,
        media_id: 1,
        role_id: 1
      }
      pool.execute.mockResolvedValue([[mockMedia]]);

      const media = await mediasService.addMediaToCreator(mockData);
      const query = "INSERT INTO Creator_media (creator_id, media_id, role_id) VALUES (?, ?, ?)";

      expect(pool.execute).toHaveBeenCalledWith(query, [mockData.creator_id, mockData.media_id, mockData.role_id]);
      expect(media).toEqual(formatedMediaData);
    });
  });

  describe("removeMediaFromCreator", () => {
    it("should delete the relation between the creator and the media", async () => {
      const mockData = {
        creator_id: 1,
        media_id: 1,
      }
      const mockResult = { affectedRows: 1 };
      pool.execute.mockResolvedValue([mockResult])

      const media = await mediasService.removeMediaFromCreator(mockData);
      const query = "DELETE FROM Creator_media WHERE creator_id = ? AND media_id = ?";

      expect(pool.execute).toHaveBeenCalledWith(query, [mockData.creator_id, mockData.media_id]);
      expect(media).toEqual(true);
    });
  });
});
