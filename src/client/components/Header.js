import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/suggestions.scss';
import './Header.scss';

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

  const [categories, setCategories] = useState([
    { id: 1, nom: 'Alimentation' },
    { id: 2, nom: 'Bâtiment' },
    { id: 3, nom: 'Services' },
    { id: 4, nom: 'Fabrication' }
  ]);

  // Chargement des spécialités par catégorie
  const [specialitesParCategorie, setSpecialitesParCategorie] = useState({});

  useEffect(() => {
    fetch('http://localhost:3001/api/categories', {
      headers: {
        'Accept': 'application/json'
      },
      mode: 'cors'
    })
      .then(response => response.json())
      .then(data => {
        const specialites = {};
        data.forEach(cat => {
          specialites[cat.id] = cat.Specialites;
        });
        setSpecialitesParCategorie(data);
      })
      .catch(err => console.error('Erreur lors du chargement des spécialités:', err));
  }, []);

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo et titre */}
        <div className="header-left">
          <Link to="/">
            <img src="/img/logo.png" alt="Trouve ton artisan" className="logo" />
          </Link>
        </div>

        {/* Partie droite avec recherche et catégories */}
        <div className="header-right">
          <form className="search-bar" onSubmit={handleSearch}>
            <div className="search-container" ref={suggestionsRef}>
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
              />
              {showSuggestions && searchTerm && (
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
          </form>

          {/* Menu des catégories */}
          <nav className={`categories-menu ${isMenuOpen ? 'open' : ''}`}>
            <ul>
              {categories.map(category => {
                const specialites = specialitesParCategorie[category.id] || [];
                return (
                  <li key={category.id}>
                    <button 
                      className="category-button"
                      onClick={() => {
                        // Rediriger vers la liste des artisans avec la catégorie sélectionnée
                        navigate(`/artisans?categorie=${category.id}`);
                        setIsMenuOpen(false);
                      }}
                    >
                      {category.nom}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Bouton menu burger pour mobile */}
        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="burger-icon"></span>
          <span className="burger-icon"></span>
          <span className="burger-icon"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;