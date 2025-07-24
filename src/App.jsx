import { useState } from 'react';
import './css/App.css';
import Favorites from './pages/Favorites';
import Home from "./pages/Home";
import NavBar from './components/NavBar';
import { MovieProvider } from './contexts/MovieContext';
import {Routes, Route} from "react-router-dom";

// Main component
function App() {
  const [count, setCount] = useState(0)


  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="favorites" element={<Favorites />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}


export default App
