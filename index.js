const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

// DB connection (OpenChoreo will inject these later)
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/orders", async (req, res) => {
  const result = await pool.query("SELECT * FROM orders");
  res.json(result.rows);
});

app.post("/orders", async (req, res) => {
  const { item, quantity } = req.body;

  const result = await pool.query(
    "INSERT INTO orders (item, quantity) VALUES (, ) RETURNING *",
    [item, quantity]
  );

  res.json(result.rows[0]);
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log("Backend running on port " + PORT);
});
