const pool = require("../../config/database");

const getStatus = async () => {
  const query = "SELECT * FROM Status";
  const [rows] = await pool.execute(query);
  return rows;
}

const createStatus = async (statusData) => {
  const query = "INSERT INTO Status (name) VALUES (?)";
  const [result] = await pool.execute(query, [statusData.name]);
  return { id: result.insertId, ...statusData };
}

const updateStatus = async (id, statusData) => {
  const query = "UPDATE Status SET name = ? WHERE id = ?";
  const [result] = await pool.execute(query, [statusData.name, id]);
  return result.affectedRows > 0 ? { id, ...statusData } : null;
}

const deleteStatus = async (id) => {
  const query = "DELETE FROM Status WHERE id = ?";
  const [result] = await pool.execute(query, [id]);
  return result.affectedRows > 0;
}

module.exports = {
  getStatus,
  createStatus,
  updateStatus,
  deleteStatus
}
