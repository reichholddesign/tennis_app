const db = require("../config/db");

const executeQuery = async (query, params) => {
  try {
    const [rows] = await db.query(query, params);
    return rows;
  } catch (error) {
    console.error("Query Execution Error:", error.message);
    throw new Error(error.message);
  }
};

module.exports = executeQuery;
