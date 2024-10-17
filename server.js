const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());  // Ensure CORS is enabled

app.get('/api/people', async (req, res) => {
  try {
    const response = await axios.get('https://swapi.dev/api/people/');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from SWAPI:', error);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
