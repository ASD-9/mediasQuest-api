const pool = require("../../config/database");

const getRoles = async () => {
  const query = "SELECT * FROM Roles";
  const [rows] = await pool.execute(query);
  return rows;
};

const createRole = async (roleData) => {
  const query = "INSERT INTO Roles (name) VALUES (?)";
  const [result] = await pool.execute(query, [roleData.name]);
  return { id: result.insertId, ...roleData };
};

const updateRole = async (id, roleData) => {
  const query = "UPDATE Roles SET name = ? WHERE id = ?";
  const [result] = await pool.execute(query, [roleData.name, id]);
  return result.affectedRows > 0 ? { id, ...roleData } : null;
};

const deleteRole = async (id) => {
  const query = "DELETE FROM Roles WHERE id = ?";
  const [result] = await pool.execute(query, [id]);
  return result.affectedRows > 0;
};

module.exports = {
  getRoles,
  createRole,
  updateRole,
  deleteRole
}
