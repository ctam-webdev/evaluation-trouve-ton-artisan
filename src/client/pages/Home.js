import React, { useState, useEffect } from 'react';
import ArtisanCard from '../components/ArtisanCard.js';

const Home = () => {
  // Artisans du mois ajoutés manuellement (premiers artisans)
  const artisansManuels = [
    {
      id: 1,
      nom: "Chocolaterie Labbé",
      specialite: "Chocolatier",
      localisation: "Lyon",
      note: 4.9,
      isManuel: true,
      image: "img-chocolaterie-labbe.jpg"
    },
    {
      id: 2,
      nom: "Au pain chaud",
      specialite: "Boulanger",
      localisation: "Montélimar",
      note: 4.8,
      isManuel: true,
      image: "img-au-pain-chaud.jpg"
    },
    {
      id: 3,
      nom: "Boucherie Dumont",
      specialite: "Boucher",
      localisation: "Lyon",
      note: 4.5,
      isManuel: true,
      image: "img-boucherie-dumont.jpg"
    }
  ];

  // État pour stocker tous les artisans du mois (manuels + automatiques)
  const [artisansDuMois, setArtisansDuMois] = useState(artisansManuels);

  useEffect(() => {
    // Récupération des artisans automatiques depuis la base de données
    const fetchArtisansAutomatiques = async () => {
      try {
        const response = await fetch('/api/artisans-du-mois');
        const artisansAuto = await response.json();
        setArtisansDuMois([...artisansManuels, ...artisansAuto]);
      } catch (error) {
        console.error('Erreur lors de la récupération des artisans:', error);
      }
    };

    // Exécution de la fonction
    fetchArtisansAutomatiques();
  }, []);

  return (
    <main className="home">
      {/* Section Bienvenue */}
      <section className="welcome">
        <h1>Bienvenue sur Trouve ton artisan !</h1>
        <p>Un service de la Région Auvergne-Rhône-Alpes</p>
        <p>Retrouvez facilement un artisan de confiance proche de chez vous, recommandé pour son savoir-faire</p>
      </section>

      {/* Section Comment trouver */}
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

      {/* Section Artisans du mois */}
      <section className="artisans-du-mois">
        <h2>Les artisans du mois :</h2>
        <div className="artisans-grid">
          {artisansDuMois.map((artisan, index) => (
            <ArtisanCard key={index} {...artisan} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;