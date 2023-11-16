import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pokedex from './pages/Pokedex';
import Favourites from './pages/Favourites';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
