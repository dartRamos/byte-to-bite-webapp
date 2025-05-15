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
      <SearchPage />
    </>
  );
};

export default App;