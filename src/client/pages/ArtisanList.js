import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import '../styles/card.scss';

const ArtisanList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('search');
  const specialiteParam = searchParams.get('specialite');
  const [artisans, setArtisans] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedSpecialite, setSelectedSpecialite] = useState(specialiteParam || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  // Charger les catégories
  useEffect(() => {
    fetch('http://localhost:3001/api/categories', {
      headers: {
        'Accept': 'application/json'
      },
      mode: 'cors'
    })
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Erreur catégories:', err));
  }, []);

  // Charger les artisans
  useEffect(() => {
    let url;
    // Si on a un terme de recherche, on utilise l'API de recherche
    if (searchTerm) {
      url = `http://localhost:3001/api/search?query=${encodeURIComponent(searchTerm)}`;
    }
    // Si on a une spécialité (soit depuis l'URL, soit depuis un clic), on utilise l'API de filtrage
    else if (specialiteParam || selectedSpecialite) {
      const specId = specialiteParam || selectedSpecialite;
      url = `http://localhost:3001/api/artisans?specialite=${specId}`;
    }
    // Sinon on affiche tous les artisans
    else {
      url = 'http://localhost:3001/api/artisans';
    }

    fetch(url, {
      headers: {
        'Accept': 'application/json'
      },
      mode: 'cors'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des artisans');
        }
        return response.json();
      })
      .then(data => {
        console.log('Artisans reçus:', data);
        setArtisans(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [selectedSpecialite, searchTerm, searchParams]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (artisans.length === 0) return <div>Aucun artisan trouvé</div>;

  return (
    <div className="artisans-page">
      <main>
        <div>
          <h2>Catégories</h2>
          {categories.map(categorie => (
            <div key={categorie.id}>
              <h3>{categorie.nom}</h3>
              {categorie.Specialites.map(specialite => (
                <button 
                  key={specialite.id}
                  onClick={() => {
                    setSelectedSpecialite(specialite.id.toString());
                    setSearchParams({ specialite: specialite.id.toString() });
                  }}
                  style={{ margin: '0 5px' }}
                >
                  {specialite.nom}
                </button>
              ))}
            </div>
          ))}
          {selectedSpecialite && (
            <button onClick={() => {
              setSelectedSpecialite('');
              setSearchParams({});
            }}>
              Voir tous les artisans
            </button>
          )}
        </div>

        <div className="artisans-list">
          {artisans.map(artisan => (
            <Link 
              to={`/artisan/${artisan.id}`} 
              key={artisan.id} 
              className="artisan-card-link"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="artisan-card">
                <div className="avatar">
                  <img
                    src={`${process.env.PUBLIC_URL}/img/${artisan.image}`}
                    alt={`Photo de ${artisan.nom}`}
                    onError={(e) => {
                      e.target.src = `${process.env.PUBLIC_URL}/img/img-default.jpg`;
                    }}
                  />
                </div>
                <div className="artisan-info">
                  <h3 className="nom-profession">{artisan.nom}</h3>
                  <div className="rating">
                    {[...Array(5)].map((_, index) => (
                      <span key={index} className={`star ${index < Math.floor(artisan.note) ? 'filled' : ''}`}>★</span>
                    ))}
                  </div>
                  <p className="specialite-localisation">{artisan.ville}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ArtisanList;
