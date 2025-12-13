const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'reservations.json');

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf8');
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// API: recevoir une réservation
function adminAuth(req, res, next) {
  const token = process.env.ADMIN_TOKEN;
  if (!token) {
    console.warn('ADMIN_TOKEN non d\u00e9fini — les routes admin sont accessibles en mode d\u00e9veloppement');
    return next();
  }

  const provided = req.get('x-admin-token') || req.query.token || req.get('authorization');
  if (provided && (provided === token || provided === `Bearer ${token}`)) return next();
  res.status(401).send('Unauthorized');
}

app.post('/api/reservations', (req, res) => {
  const { name, email, date, time } = req.body || {};
  if (!name || !email || !date || !time) {
    return res.status(400).json({ ok: false, error: 'Champs manquants' });
  }

  try {
    ensureDataFile();
    const list = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')) || [];
    const item = {
      id: Date.now(),
      name,
      email,
      date,
      time,
      createdAt: new Date().toISOString()
    };
    list.push(item);
    fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), 'utf8');
    return res.status(201).json({ ok: true, item });
  } catch (err) {
    console.error('Erreur écriture réservation', err);
    return res.status(500).json({ ok: false, error: 'Erreur serveur' });
  }
});

// Admin: lister les réservations (JSON)
app.get('/admin/reservations', adminAuth, (req, res) => {
  try {
    ensureDataFile();
    const list = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')) || [];
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Impossible de lire les données' });
  }
});

// Admin: exporter CSV
app.get('/admin/export.csv', adminAuth, (req, res) => {
  try {
    ensureDataFile();
    const list = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')) || [];
    const header = 'id,name,email,date,time,createdAt';
    const rows = list.map(r => {
      // échapper les guillemets
      const name = (r.name || '').replace(/"/g, '""');
      const email = (r.email || '').replace(/"/g, '""');
      return `${r.id},"${name}","${email}",${r.date},${r.time},${r.createdAt}`;
    });
    const csv = [header].concat(rows).join('\n');
    res.setHeader('Content-Disposition', 'attachment; filename="reservations.csv"');
    res.type('text/csv').send(csv);
  } catch (err) {
    res.status(500).send('Erreur export CSV');
  }
});

// Admin UI
app.get('/admin', adminAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// fallback to index.html for other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});