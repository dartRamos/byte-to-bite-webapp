import './App.css';
import Fridge from './components/Fridge';
import Nav from './components/Nav';
import SearchPage from './components/SearchPage';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Nav />
      
      <Routes>
        <Route path="/" element={<Fridge />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
      {/* <SearchPage /> */}
      <div className="bg-red-600 text-yellow-300 font-extrabold text-4xl p-8 rounded-xl shadow-2xl transform rotate-6 hover:scale-110 transition-all duration-500 testing-tailwind">
       TESTING TAILWIND TESTING TAILWIND TESTING TAILWIND!
      </div>
    </>
  );
};

export default App;