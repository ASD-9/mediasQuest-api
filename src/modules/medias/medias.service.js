const pool = require("../../config/database");

const formatMediaData = (row) => {
  return {
    id: row.id,
    name: row.name,
    status: {
      id: row.status_id,
      name: row.status_name
    },
    type: {
      id: row.type_id,
      name: row.type_name
    },
    role: {
      id: row.role_id,
      name: row.role_name
    }
  };
}

const getMediasByType = async (typeId) => {
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
  const [rows] = await pool.execute(query, [typeId]);
  return rows.map(row => formatMediaData(row));
}

const getMediasByCreator = async (creatorId) => {
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
    WHERE cm.creator_id = ?
  `;
  const [rows] = await pool.execute(query, [creatorId]);
  return rows.map(row => formatMediaData(row));
}

const getMediaById = async (id) => {
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
  const [rows] = await pool.execute(query, [id]);
  return rows.length > 0 ? formatMediaData(rows[0]) : null;
}

const createMedia = async (mediaData) => {
  const query = "INSERT INTO Medias (name, status_id, type_id) VALUES (?, ?, ?)";
  const [result] = await pool.execute(query, [mediaData.name, mediaData.status_id, mediaData.type_id]);
  return await getMediaById(result.insertId);
}

const updateMedia = async (id, mediaData) => {
  const updates = Object.keys(mediaData).map(key => `${key} = ?`).join(", ");
  const values = [...Object.values(mediaData), id];
  const query = `UPDATE Medias SET ${updates} WHERE id = ?`;
  const [result] = await pool.execute(query, values);
  return result.affectedRows > 0 ? await getMediaById(id) : null;
}

const deleteMedia = async (id) => {
  const query = "DELETE FROM Medias WHERE id = ?";
  const [result] = await pool.execute(query, [id]);
  return result.affectedRows > 0;
}

const addMediaToCreator = async (data) => {
  const query = "INSERT INTO Creator_media (creator_id, media_id, role_id) VALUES (?, ?, ?)";
  await pool.execute(query, [data.creator_id, data.media_id, data.role_id]);
  return await getMediaById(data.media_id);
}

const removeMediaFromCreator = async (data) => {
  const query = "DELETE FROM Creator_media WHERE creator_id = ? AND media_id = ?";
  const [result] = await pool.execute(query, [data.creator_id, data.media_id]);
  return result.affectedRows > 0;
}

module.exports = {
  getMediasByType,
  getMediasByCreator,
  getMediaById,
  createMedia,
  updateMedia,
  deleteMedia,
  addMediaToCreator,
  removeMediaFromCreator
}
