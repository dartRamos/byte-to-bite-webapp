const express = require('express');
const spoonacularRoutes = require('./routes/spoonacular'); 
const cors = require('cors');
const morgan = require('morgan');
const path = require("path")

require('dotenv').config();
const favoritesRoutes  = require('./routes/favorites')


const app = express(); 
const PORT = process.env.PORT || 8080;

app.use(morgan('dev')); 
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend/dist")))

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
})

// Spoonacular Routes
app.use('/api/spoonacular', spoonacularRoutes);

//saveRecipe Route
app.use('/db', favoritesRoutes);


app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
