import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Home from './pages/Home.js';
import ArtisanDetails from './pages/ArtisanDetails.js';
import ArtisanList from './pages/ArtisanList.js';
import NotFound from './pages/NotFound.js';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artisan/:id" element={<ArtisanDetails />} />
          <Route path="/artisans" element={<ArtisanList />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
