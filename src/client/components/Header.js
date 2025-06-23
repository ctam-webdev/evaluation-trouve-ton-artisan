import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/suggestions.scss';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [specialites, setSpecialites] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length >= 2) {
        try {
          const response = await fetch(`http://localhost:3001/api/suggest?query=${encodeURIComponent(searchTerm)}`);
          const data = await response.json();
          setSuggestions(data.suggestions);
          setSpecialites(data.specialites || []);
          setTotalResults(data.count);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Erreur lors de la récupération des suggestions:', error);
        }
      } else {
        setSuggestions([]);
        setSpecialites([]);
        setTotalResults(0);
        setShowSuggestions(false);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/artisans?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

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
        <form className="search-bar" onSubmit={handleSearch}>
          <div className="search-container" ref={suggestionsRef}>
            <input 
              type="text" 
              placeholder="Rechercher un artisan..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {showSuggestions && searchTerm.length >= 2 && (
              <div className="suggestions-dropdown">
                {specialites.length > 0 && (
                  <div className="specialites-section">
                    <div className="section-title">Spécialités</div>
                    {specialites.map((specialite) => (
                      <div 
                        key={`spec-${specialite.id}`} 
                        className="suggestion-item specialite-item"
                        onClick={() => {
                          setShowSuggestions(false);
                          navigate(`/artisans?specialite=${specialite.id}`);
                        }}
                      >
                        <div className="suggestion-name">{specialite.nom}</div>
                        <div className="suggestion-type">Catégorie</div>
                      </div>
                    ))}
                  </div>
                )}
                
                {suggestions.length > 0 && (
                  <div className="artisans-section">
                    <div className="section-title">Artisans</div>
                    <div className="results-count">{totalResults} résultat{totalResults !== 1 ? 's' : ''} trouvé{totalResults !== 1 ? 's' : ''}</div>
                    {suggestions.map((suggestion) => (
                      <div 
                        key={suggestion.id} 
                        className="suggestion-item"
                        onClick={() => {
                          setSearchTerm(suggestion.nom);
                          setShowSuggestions(false);
                          navigate(`/artisans?search=${encodeURIComponent(suggestion.nom)}`);
                        }}
                      >
                        <div className="suggestion-name">{suggestion.nom}</div>
                        <div className="suggestion-details">
                          {suggestion.specialite && <span>{suggestion.specialite}</span>}
                          {suggestion.ville && <span>{suggestion.ville}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          <button type="submit" className="search-button">
            Rechercher
          </button>
        </form>

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