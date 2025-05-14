import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SearchPage from './components/SearchPage';

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className="text-3xl font-bold text-blue-600">Welcome to Byte-to-Bite</h1>
        <br />
        {/* Button to navigate to the SearchPage */}
        <Link to="/search">
          <button className="btn btn-primary">Search Page</button>
        </Link>

        {/* Define routes */}
        <Routes>
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
