import React, { useState, useEffect } from 'react';
import ArtisanCard from '../components/ArtisanCard.js';

const Home = () => {
  const [artisansDuMois, setArtisansDuMois] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Noms des artisans du mois
  const nomsArtisansDuMois = ["Au pain chaud", "Chocolaterie Labbé", "Orville Salmons"];

  useEffect(() => {
    // Récupérer tous les artisans pour trouver ceux du mois
    Promise.all([
      fetch('http://localhost:3001/api/artisans?categorie=1'),
      fetch('http://localhost:3001/api/artisans?categorie=2'),
      fetch('http://localhost:3001/api/artisans?categorie=3'),
      fetch('http://localhost:3001/api/artisans?categorie=4')
    ])
      .then(responses => {
        return Promise.all(responses.map(r => r.json()));
      })
      .then(allArtisans => {
        // Fusion des résultats de toutes les catégories
        const artisans = allArtisans.flat();
        
        // Filtrer pour ne garder que les artisans du mois
        const artisansFiltres = artisans
          .filter(artisan => {
            const isArtisanDuMois = nomsArtisansDuMois.includes(artisan.nom);

            return isArtisanDuMois;
          })
          .map(artisan => {

            return {
              id: artisan.id,
              nom: artisan.nom,
              specialite: artisan.specialite,
              localisation: artisan.ville,
              note: artisan.note,
              image: artisan.image
            };
          });

        setArtisansDuMois(artisansFiltres);
        setLoading(false);
      })
      .catch(err => {

        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <main className="home">
      {/* Section "Bienvenue" */}
      <section className="welcome">
        <h1>Bienvenue sur Trouve ton artisan !</h1>
        <p>Un service de la Région Auvergne-Rhône-Alpes</p>
        <p>Retrouvez facilement un artisan de confiance proche de chez vous, recommandé pour son savoir-faire</p>
      </section>

      {/* Section "Comment trouver" */}
      <section className="how-to-find">
        <h2>Comment trouver mon artisan ?</h2>
        <div className="steps">
          <div className="step">
            <span className="step-number">1</span>
            <p>Choisir la catégorie d'artisanat dans le menu</p>
          </div>
          <div className="step">
            <span className="step-number">2</span>
            <p>Choisir un artisan</p>
          </div>
          <div className="step">
            <span className="step-number">3</span>
            <p>Le contacter via le formulaire de contact</p>
          </div>
          <div className="step">
            <span className="step-number">4</span>
            <p>Une réponse sera apportée sous 48h</p>
          </div>
        </div>
      </section>

      {/* Section "Artisans du mois" */}
      <section className="artisans-du-mois">
        <h2>Les artisans du mois :</h2>
        <div className="artisans-list grid-view">
          {artisansDuMois.map((artisan) => {
            return (
              <ArtisanCard
                key={artisan.id}
                id={artisan.id}
                nom={artisan.nom}
                specialite={artisan.specialite}
                localisation={artisan.localisation}
                note={artisan.note}
                image={artisan.image}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Home;