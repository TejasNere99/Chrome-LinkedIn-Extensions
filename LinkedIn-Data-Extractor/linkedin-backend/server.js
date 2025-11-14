const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize, Profile } = require('./models');

const app = express();
app.use(cors()); // allow extension to post
app.use(bodyParser.json());

app.post('/api/profiles', async (req, res) => {
  try {
    const data = req.body;
    // Basic validation
    if (!data.name || !data.url) return res.status(400).json({ error: 'name and url required' });
    const profile = await Profile.create(data);
    res.json({ success: true, profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal' });
  }
});

app.get('/api/profiles', async (req, res) => {
  const list = await Profile.findAll({ order: [['createdAt','DESC']] });
  res.json(list);
});

app.get('/', async (req, res) => {
  const profiles = await Profile.findAll({ order: [['createdAt', 'DESC']] });

  // HTML formatting
  const html = `
  <html>
  <head>
    <title>LinkedIn Profiles Data</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background: #f5f7fa;
        padding: 30px;
      }
      h1 {
        text-align: center;
        color: #333;
      }
      table {
        border-collapse: collapse;
        width: 100%;
        margin-top: 20px;
        background: white;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
      }
      th, td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #ddd;
      }
      th {
        background: #0073b1;
        color: white;
      }
      tr:hover {
        background: #f1f1f1;
      }
      .url a {
        color: #0073b1;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <h1>Scraped LinkedIn Profiles</h1>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Location</th>
          <th>About</th>
          <th>Bio</th>
          <th>Follower Count</th>
          <th>Connection Count</th>
          <th>Bio Line</th>
          <th>Profile Link</th>
        </tr>
      </thead>
      <tbody>
        ${profiles.map((p, i) => `
          <tr>
            <td>${i + 1}</td>
            <td>${p.name || '-'}</td>
            <td>${p.location || '-'}</td>
            <td>${p.about || '-'}</td>
            <td>${p.bio || '-'}</td>
            <td>${p.followerCount || '-'}</td>
            <td>${p.connectionCount || '-'}</td>
            <td>${p.bioLine || '-'}</td>
            <td class="url"><a href="${p.url}" target="_blank">View</a></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </body>
  </html>
  `;

  res.send(html);
});


const PORT = 3000;
(async () => {
  await sequelize.sync(); // creates tables
  app.listen(PORT, () => console.log(`API listening http://localhost:${PORT}`));
})();
