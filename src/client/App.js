import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Home from './pages/Home.js';
import ArtisanDetails from './pages/ArtisanDetails.js';
import ArtisanList from './pages/ArtisanList.js';
import NotFound from './pages/NotFound.js';
import WorkInProgress from './pages/WorkInProgress.js';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artisan/:id" element={<ArtisanDetails />} />
          <Route path="/artisans" element={<ArtisanList />} />
          <Route path="/mentions-legales" element={<WorkInProgress />} />
          <Route path="/donnees-personnelles" element={<WorkInProgress />} />
          <Route path="/accessibilite" element={<WorkInProgress />} />
          <Route path="/presse" element={<WorkInProgress />} />
          <Route path="/marches-publics" element={<WorkInProgress />} />
          <Route path="/venir-region" element={<WorkInProgress />} />
          <Route path="/contacts" element={<WorkInProgress />} />
          <Route path="/cookies" element={<WorkInProgress />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
