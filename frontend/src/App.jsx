import './App.css';
import Fridge from './components/Fridge';
import Nav from './components/Nav';

import SearchPage from './components/SearchPage';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Nav />

      {/* TESTING TAILWIND */}
      <div className="bg-red-600 text-yellow-300 p-8 text-4xl">
      <h1>TESTING TAILWIND STYLING  </h1>
      </div>

      {/* <SearchPage /> */}

      
      <Routes>
        <Route path="/" element={<Fridge />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
      
    </>
  );
};

export default App;