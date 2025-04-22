const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

// Serve static files
app.use(express.static(path.join(__dirname)));

// Proxy endpoint for RapidAPI lookup
app.get('/api', async (req, res) => {
  const id = req.query.id;
  if (!id) return res.status(400).json({ error: 'Missing id' });
  try {
    const apiRes = await fetch(
      `https://get-nickname-games.p.rapidapi.com/bgmi?id=${encodeURIComponent(id)}`,
      {
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'get-nickname-games.p.rapidapi.com'
        }
      }
    );
    const data = await apiRes.json();
console.log('[API Response]', data);
    if (data.status === 'success') return res.json({ name: data.data.nickname });
    return res.status(404).json({ error: 'Player not found' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
