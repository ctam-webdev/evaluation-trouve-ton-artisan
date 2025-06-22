import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Ces catégories viendront de l'API plus tard
  const categories = [
    { id: 1, nom: 'Alimentation' },
    { id: 2, nom: 'Bâtiment' },
    { id: 3, nom: 'Services' },
    { id: 4, nom: 'Fabrication' }
  ];

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo et titre */}
        <div className="header-left">
          <h1>Trouve ton artisan !</h1>
        </div>

        {/* Barre de recherche */}
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Rechercher un artisan..."
            className="search-input"
          />
          <button className="search-button">
            Rechercher
          </button>
        </div>

        {/* Bouton menu burger pour mobile */}
        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="burger-icon"></span>
        </button>
      </div>

      {/* Menu des catégories */}
      <nav className={`categories-menu ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          {categories.map(category => (
            <li key={category.id}>
              <button className="category-button">
                {category.nom}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;