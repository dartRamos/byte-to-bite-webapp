// Server API

// setting up a port for the backend 
// we will need 2 servers running, one for backend and one for frontend
const PORT = 8080; 
const app = require('express')(); 
const cors = require('cors'); // security protocol that prevents applications from different ports to access your info. 

const uniqid = require('uniqid'); // to facilitate creating unique ids for our fake data

// Morgan is a middleware for logging HTTP requests within Express.js applications. It provides a simple way to log details like request method, URL, status code, and response time.
const morgan = require('morgan');

app.use(morgan('dev')); 
app.use(cors());


// using fake data for now just to make sure backend is connected to frontend 
// we will move on to SQL later 
const data = [
  {
    id: uniqid(), 
    title: "Recipe 1",
    instructions: "Bacon ipsum dolor amet buffalo boudin ham pig andouille chislic, doner venison salami pancetta meatball. "
  }, 
  {
    id: uniqid(), 
    title: "Recipe 2",
    instructions: "Pancetta andouille drumstick, porchetta picanha tenderloin short ribs doner pork chop kevin turducken tail turkey hamburger jerky."
  }, 
  {
    id: uniqid(), 
    title: "Recipe 3",
    instructions: " Tenderloin meatloaf tail, short ribs kevin cupim porchetta ribeye boudin short loin cow. "
  }, 

]

// the endpoint http://localhost/8080/recipes should display the data object in a form of JSON
app.get('/recipes', (req, res) => {
  res.json(data);
})

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))

