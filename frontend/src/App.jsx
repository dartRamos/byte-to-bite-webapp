import './App.css'
import TestData from './components/TestData'
import { useEffect, useState } from 'react'


function App() {

  // State to store the list of recipes fetched from the backend
  const [recipes, setRecipes] = useState([]);

  // Async function to fetch recipe data from the backend API
  async function getData() {
    try {
      // Fetching data from the backend server
      const response = await fetch('http://localhost:8080/recipes')

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Response Status: ${response.status}`)
      }

      // Parse the response body as JSON
      const data = await response.json();
      // Return the parsed data
      return data;
    }

    catch (error) {
      // Log any errors that occurred during the fetch
      console.log(`Error was received ${error}`)
    }
  }
  
  // useEffect runs once when the component mounts (because of the empty dependency array)
  useEffect(() => {
    // Define an async function to fetch and set data
    const fetchData = async () => {
      const data = await getData();
      setRecipes(data); // Store the fetched data in state
    }
    fetchData(); // Call the async function
    
  },[])


  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600">Welcome to Byte-to-Bite</h1>
      <br/>
      {/* Render the TestData component and pass recipes as a prop */}
      {/* <TestData recipes={recipes} /> */}
      
    </div>

  )
}

export default App