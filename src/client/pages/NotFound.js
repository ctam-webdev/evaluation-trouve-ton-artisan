import React from 'react';
import '../styles/notfound.scss';

const NotFound = () => {
  return (
    <main className="not-found-container">
      <img
        src={`${process.env.PUBLIC_URL}/img/error 404/20945761.jpg`}
        alt="Erreur 404"
        className="error-image"
      />
      <h1>Page non trouvée</h1>
    </main>
  );
};

export default NotFound;