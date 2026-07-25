require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      done BOOLEAN NOT NULL DEFAULT false
    )
  `);

  const { rows } = await pool.query('SELECT COUNT(*) AS count FROM tasks');
  if (Number(rows[0].count) === 0) {
    await pool.query(`
      INSERT INTO tasks (title, done) VALUES
      ('Buy milk', false),
      ('Walk the dog', true),
      ('Finish assignment', false)
    `);
  }
}

module.exports = { pool, init };