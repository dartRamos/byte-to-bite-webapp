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
      <div className="bg-red-600 text-yellow-300 p-8 text-4xl">
      Tailwind should work here!
      </div>
    </>
  );
};

export default App;