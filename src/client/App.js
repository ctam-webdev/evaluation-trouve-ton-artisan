import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Home from './pages/Home.js';
import ArtisanDetails from './pages/ArtisanDetails.js';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artisan/:id" element={<ArtisanDetails />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
