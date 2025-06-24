import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ContactForm from '../components/ContactForm.js';
import '../styles/details.scss';

const ArtisanDetails = () => {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/api/artisans/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Artisan non trouvé');
        }
        return response.json();
      })
      .then(data => {

        setArtisan(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Chargement...</div>;
  if (error || !artisan) return <Navigate to="/404" replace />;

  return (
    <main className="artisan-details">
      {/* En-tête avec les informations principales */}
      <section className="artisan-header">
        <div className="artisan-image">
          <img
            src={imageError
              ? `${process.env.PUBLIC_URL}/img/img-default.jpg`
              : `${process.env.PUBLIC_URL}/img/${artisan.image}`
            }
            alt={`Photo de ${artisan.nom}`}
            onError={() => setImageError(true)}
          />
        </div>
        <div className="artisan-info">
          <h1>{artisan.nom}</h1>
          <div className="rating">
            {'★'.repeat(Math.floor(artisan.note))}
            {'☆'.repeat(5 - Math.floor(artisan.note))}
            <span>({artisan.note}/5)</span>
          </div>
        </div>
      </section>

      {/* Informations de contact */}
      <section className="contact-section">
        <h2>Coordonnées</h2>
        <p>{artisan.ville}</p>
        <p>Email : {artisan.email}</p>
        {artisan.siteWeb && <p>Site web : {artisan.siteWeb}</p>}
      </section>

      {/* Description et spécialités */}
      <section className="description-section">
        <h2>À propos</h2>
        <p>{artisan.a_propos}</p>
        
        <h3>Spécialités</h3>
        <ul>
          <li>{artisan.specialite}</li>
        </ul>
      </section>

      {/* Formulaire de contact */}
      <section className="contact-form-section">
        <h2>Contacter cet artisan</h2>
        <ContactForm artisanId={artisan.id} artisanNom={artisan.nom} />
      </section>
    </main>
  );
};

export default ArtisanDetails;