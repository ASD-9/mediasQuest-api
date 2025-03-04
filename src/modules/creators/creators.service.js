const pool = require("../../config/database");

const getCreatorsByType = async (typeId) => {
  const query = `
    SELECT
      c.*,
      COUNT(m.id) AS medias_count
    FROM Creators c
    JOIN Creator_media cm ON c.id = cm.creator_id
    JOIN Medias m ON m.id = cm.media_id
    JOIN Types t ON t.id = m.type_id
    WHERE t.id = ?
    GROUP BY c.id
  `;
  const [rows] = await pool.execute(query, [typeId]);
  return rows;
};

const createCreator = async (creatorData) => {
  const query = "INSERT INTO Creators (name) VALUES (?)";
  const [result] = await pool.execute(query, [creatorData.name]);
  return { id: result.insertId, ...creatorData };
};

const updateCreator = async (id, creatorData) => {
  const query = "UPDATE Creators SET name = ? WHERE id = ?";
  const [result] = await pool.execute(query, [creatorData.name, id]);
  return result.affectedRows > 0 ? { id, ...creatorData } : null;
};

const deleteCreator = async (id) => {
  const query = "DELETE FROM Creators WHERE id = ?";
  const [result] = await pool.execute(query, [id]);
  return result.affectedRows > 0;
};

module.exports = {
  getCreatorsByType,
  createCreator,
  updateCreator,
  deleteCreator,
}
