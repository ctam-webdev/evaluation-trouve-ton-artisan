import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ArtisanCard from '../components/ArtisanCard.js';

import '../components/ArtisanCard.scss';

const ArtisanList = () => {
  // Récupération des paramètres de l'URL
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const specialiteId = searchParams.get('specialite');
  const categorieId = searchParams.get('categorie');
  const [searchQueryState, setSearchQueryState] = useState('');
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [artisans, setArtisans] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedSpecialite, setSelectedSpecialite] = useState(specialiteId || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Chargement des catégories
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

  // Chargement des artisans
  useEffect(() => {
    let url = 'http://localhost:3001/api/artisans';
    
    // Ajout des paramètres de recherche si présents
    const params = new URLSearchParams();
    if (searchQuery) params.append('search', searchQuery);
    if (specialiteId) params.append('specialite', specialiteId);
    if (categorieId) params.append('categorie', categorieId);
    
    // Ajout des paramètres à l'URL si présents
    if (params.toString()) {
      url += '?' + params.toString();
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

        setArtisans(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [searchQuery, specialiteId, categorieId]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (artisans.length === 0) return <div>Aucun artisan trouvé</div>;

  // Trouver le nom de la catégorie sélectionnée
  const getCurrentCategory = () => {
    // Si catégorie sélectionnée
    if (categorieId) {
      const categorie = categories.find(c => c.id.toString() === categorieId);
      if (categorie) return categorie.nom;
    }
    
    // Si spécialité sélectionnée
    if (selectedSpecialite) {
      for (const categorie of categories) {
        const specialite = categorie.Specialites.find(s => s.id.toString() === selectedSpecialite);
        if (specialite) {
          return `${categorie.nom} - ${specialite.nom}`;
        }
      }
    }
    
    return 'Tous les Artisans';
  };

  return (
    <div className="artisans-page">
      <main>
        <h1 className="page-title">{getCurrentCategory()}</h1>

        <div className="artisans-list">
          {artisans.map(artisan => {

            return (
              <ArtisanCard
                key={artisan.id}
                id={artisan.id}
                nom={artisan.nom}
                specialite={artisan.specialite}
                localisation={artisan.ville}
                note={artisan.note}
                image={artisan.image}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default ArtisanList;