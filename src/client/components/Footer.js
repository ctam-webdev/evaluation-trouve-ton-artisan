import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Informations de contact */}
        <div className="contact-info">
          <h3>LYON</h3>
          <p>101 cours Charlemagne</p>
          <p>CS 20033</p>
          <p>69269 LYON CEDEX 02</p>
          <p>France</p>
          <p>Ouvert du lundi au vendredi de 8h30 à 17h</p>
          <p>+33 (0)4 26 73 40 00</p>
        </div>

        {/* Liens utiles - préparés pour React Router, mais pas encore implémentés */}
        <div className="footer-links">
          <ul>
            <li><Link to="/mentions-legales">Mentions légales</Link></li>
            <li><Link to="/donnees-personnelles">Données personnelles</Link></li>
            <li><Link to="/accessibilite">Accessibilité</Link></li>
            <li><Link to="/presse">Presse</Link></li>
            <li><Link to="/marches-publics">Marchés publics</Link></li>
            <li><Link to="/venir-region">Venir à la Région</Link></li>
            <li><Link to="/contacts">Contacts</Link></li>
            <li><Link to="/cookies">Cookies</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;