import React, { useState } from 'react';

const ContactForm = ({ artisanId, artisanNom }) => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    objet: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          artisanId,
          artisanNom
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l\'envoi du message');
      }

      setStatus({
        submitting: false,
        success: true,
        error: null
      });
      setFormData({
        nom: '',
        email: '',
        telephone: '',
        objet: '',
        message: ''
      });
    } catch (error) {
      setStatus({
        submitting: false,
        success: false,
        error: error.message
      });
    }
  };

  if (status.success) {
    return (
      <div className="success-message">
        <h3>Message envoyé !</h3>
        <p>Votre message a bien été transmis à {artisanNom}.</p>
        <button 
          onClick={() => setStatus({ submitting: false, success: false, error: null })}
          className="new-message-btn"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <label htmlFor="nom">Nom *</label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          required
          minLength={2}
          placeholder="Votre nom"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="votre@email.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="telephone">Téléphone (optionnel)</label>
        <input
          type="tel"
          id="telephone"
          name="telephone"
          value={formData.telephone}
          onChange={handleChange}
          placeholder="06 12 34 56 78"
        />
      </div>

      <div className="form-group">
        <label htmlFor="objet">Objet *</label>
        <input
          type="text"
          id="objet"
          name="objet"
          value={formData.objet}
          onChange={handleChange}
          required
          minLength={5}
          maxLength={100}
          placeholder="Sujet de votre message"
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          minLength={10}
          placeholder="Votre message..."
          rows={5}
        />
      </div>

      {status.error && (
        <div className="error-message">
          {status.error}
        </div>
      )}

      <button 
        type="submit" 
        disabled={status.submitting}
        className="submit-button"
      >
        {status.submitting ? 'Envoi en cours...' : 'Envoyer le message'}
      </button>
    </form>
  );
};

export default ContactForm;