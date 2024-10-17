// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// In-memory storage for comments
const commentsStorage = {};

// Route to fetch people (characters) from SWAPI
app.get('/api/people', async (req, res) => {
  try {
    const response = await axios.get('https://swapi.dev/api/people/');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching characters from SWAPI:', error);
    res.status(500).json({ message: 'Error fetching characters from SWAPI' });
  }
});

// Route to get comments for a character (by character name)
app.get('/api/characters/:name/comments', (req, res) => {
  const { name } = req.params;
  const characterComments = commentsStorage[name] || [];
  res.json(characterComments);
});

// Route to post a comment for a character (by character name)
app.post('/api/characters/:name/comments', (req, res) => {
  const { name } = req.params;
  const { comment } = req.body;

  // Initialize comments for the character if not already present
  if (!commentsStorage[name]) {
    commentsStorage[name] = [];
  }

  // Add the comment to the character's comment list
  commentsStorage[name].push(comment);

  res.status(201).json(commentsStorage[name]);  // Return the updated comments
});

app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}`);
});
