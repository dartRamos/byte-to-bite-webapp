const express = require('express'); // Import express
const spoonacularRoutes = require('./routes/spoonacular'); // Route that leads to spoonacular API
const cors = require('cors'); // Security protocol that prevents applications from different ports from accessing your info
const uniqid = require('uniqid'); // To facilitate creating unique ids for our fake data
const morgan = require('morgan'); // Middleware for logging HTTP requests
require('dotenv').config(); // Load environment variables

const app = express(); // Create an instance of express
const PORT = process.env.PORT || 8080; // Set up a port for the backend

app.use(morgan('dev')); 
app.use(cors());
app.use(express.json());

// Register Spoonacular Routes
app.use('/api/spoonacular', spoonacularRoutes);

app.use(saveRecipeRouter);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
