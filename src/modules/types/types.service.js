const pool = require("../../config/database");

const getTypes = async () => {
  const query = "SELECT * FROM Types";
  const [rows] = await pool.execute(query);
  return rows;
}

const createType = async (typeData) => {
  const query = "INSERT INTO Types (name) VALUES (?)";
  const [result] = await pool.execute(query, [typeData.name]);
  return { id: result.insertId, ...typeData };
}

const updateType = async (id, typeData) => {
  const query = "UPDATE Types SET name = ? WHERE id = ?";
  const [result] = await pool.execute(query, [typeData.name, id]);
  return result.affectedRows > 0 ? { id, ...typeData } : null;
}

const deleteType = async (id) => {
  const query = "DELETE FROM Types WHERE id = ?";
  const [result] = await pool.execute(query, [id]);
  return result.affectedRows > 0;
}

module.exports = {
  getTypes,
  createType,
  updateType,
  deleteType
}
