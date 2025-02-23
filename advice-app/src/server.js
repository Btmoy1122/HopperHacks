// server.js
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('stress_tracker.db');

app.use(bodyParser.json());

// Create stress logs table
db.run(`CREATE TABLE IF NOT EXISTS stress_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    stress_level INTEGER,
    trigger TEXT
)`);

// Log stress level
app.post('/api/log-stress', (req, res) => {
    const { stress_level, trigger } = req.body;
    const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    db.run(
        'INSERT INTO stress_logs (date, stress_level, trigger) VALUES (?, ?, ?)',
        [date, stress_level, trigger],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Stress logged successfully!' });
        }
    );
});

// Get stress logs
app.get('/api/stress-logs', (req, res) => {
    db.all('SELECT date, stress_level FROM stress_logs', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));

// server.js (add to existing backend)
app.post('/api/log-journal', (req, res) => {
    const { entry } = req.body;
    const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    db.run(
        'INSERT INTO journal_entries (date, entry) VALUES (?, ?)',
        [date, entry],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Journal entry logged successfully!' });
        }
    );
});

app.get('/api/journal-entries', (req, res) => {
    db.all('SELECT date, entry FROM journal_entries', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});