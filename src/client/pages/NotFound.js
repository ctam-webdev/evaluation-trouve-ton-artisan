import React from 'react';

import Footer from '../components/Footer.js';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <main className="not-found-container">
        <img
          src={`${process.env.PUBLIC_URL}/img/error 404/20945761.jpg`}
          alt="Erreur 404"
          className="error-image"
        />
        <h1>Page non trouvée</h1>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;