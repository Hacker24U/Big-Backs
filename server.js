const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const db = new sqlite3.Database('orders.db');

app.use(cors());
app.use(express.json());

// Create orders table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT,
  name TEXT,
  items TEXT,
  total REAL,
  payment REAL,
  change REAL
)`);

app.post('/order', (req, res) => {
  const { name, items, total, payment, change } = req.body;
  const date = new Date().toISOString().slice(0, 10);
  db.run(
    'INSERT INTO orders (date, name, items, total, payment, change) VALUES (?, ?, ?, ?, ?, ?)',
    [date, name, JSON.stringify(items), total, payment, change],
    function (err) {
      if (err) return res.status(500).send('Error saving order');
      res.json({ orderNumber: this.lastID });
    }
  );
});

app.get('/orders/:date', (req, res) => {
  db.all(
    'SELECT * FROM orders WHERE date = ?',
    [req.params.date],
    (err, rows) => {
      if (err) return res.status(500).send('Error fetching orders');
      res.json(rows);
    }
  );
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));