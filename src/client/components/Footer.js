import React from 'react';

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
            <li>Mentions légales</li>
            <li>Données personnelles</li>
            <li>Accessibilité</li>
            <li>Presse</li>
            <li>Marchés publics</li>
            <li>Venir à la Région</li>
            <li>Contacts</li>
            <li>Cookies</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;