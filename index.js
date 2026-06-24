const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
// Allow requests from the frontend
app.use(cors()); 
// Allow the app to read JSON data
app.use(express.json());

const port = 5000; // Safely avoiding your OpenChoreo 8080 port

// 1. Connect to the Database using OpenChoreo's injected environment variables
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// 2. Automatically create the 'orders' table when the server starts
pool.query(`
  CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    item VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending'
  )
`).catch(err => console.error("Failed to create table:", err));

// 3. GET route to fetch all orders
app.get('/orders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. POST route to add a new order
app.post('/orders', async (req, res) => {
  try {
    const { item } = req.body;
    await pool.query('INSERT INTO orders (item) VALUES ($1)', [item]);
    res.json({ message: "Order placed successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
// Allow requests from the frontend
app.use(cors()); 
// Allow the app to read JSON data
app.use(express.json());

const port = 5000; // Safely avoiding your OpenChoreo 8080 port

// 1. Connect to the Database using OpenChoreo's injected environment variables
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// 2. Automatically create the 'orders' table when the server starts
pool.query(`
  CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    item VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending'
  )
`).catch(err => console.error("Failed to create table:", err));

// 3. GET route to fetch all orders
app.get('/orders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. POST route to add a new order
app.post('/orders', async (req, res) => {
  try {
    const { item } = req.body;
    await pool.query('INSERT INTO orders (item) VALUES ($1)', [item]);
    res.json({ message: "Order placed successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Backend listening safely on port ${port}`);
});