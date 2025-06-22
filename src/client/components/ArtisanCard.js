import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ArtisanCard = ({ id, nom, specialite, localisation, note, image }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Link to={`/artisan/${id}`} className="artisan-card">
      <div className="artisan-avatar">
        <img
          src={imageError
            ? `/img/img-default.jpg`
            : `/img/${image}`
          }
          alt={`Photo de ${nom}`}
          onError={() => setImageError(true)}
        />
      </div>
      <h3>{nom}</h3>
      <div className="artisan-info">
        <p>{specialite} - {localisation}</p>
        <div className="rating">
          {'★'.repeat(Math.floor(note))}
          {'☆'.repeat(5 - Math.floor(note))}
        </div>
      </div>
    </Link>
  );
};

export default ArtisanCard;