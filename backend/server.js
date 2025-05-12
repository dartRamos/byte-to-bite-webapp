require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const uniqid = require('uniqid');
const morgan = require('morgan');

const app = express();
const PORT = 8080;

app.use(morgan('dev'));
app.use(cors());

// Debug: check if the env loaded
console.log('Loaded API key:', process.env.SPOONACULAR_API_KEY);

// Route to get recipe info by ID
app.get('/recipes/:id/info', async (req, res) => {
  const recipeId = req.params.id;
  const apiKey = process.env.SPOONACULAR_API_KEY;

  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions`, {
      params: { apiKey }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching recipe info:', error);
    res.status(500).json({ error: 'Failed to fetch recipe info' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
