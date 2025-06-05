import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const ClientCheckInPage = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    clientAddress: '',
    licenseNumber: '',
    driverLicensePhotos: '',
    idCardPhotos: '',
    signature: '',
    latitude: '',
    longitude: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const checkPending = async () => {
      const pending = localStorage.getItem('pendingReservation');
      if (pending) {
        try {
          const parsed = JSON.parse(pending);
          const { error } = await supabase.from('reservations').insert([parsed]);
          if (!error) localStorage.removeItem('pendingReservation');
        } catch (err) {
          console.error('Erreur insertion locale :', err);
        }
      }
    };
    checkPending();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, [field]: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('reservations').insert([formData]);
      if (error) throw error;
      alert('Réservation enregistrée !');
      navigate('/');
    } catch (error) {
      console.error("Erreur lors de l'ajout de la réservation :", error.message);
      localStorage.setItem('pendingReservation', JSON.stringify(formData));
      alert("Problème de réseau. La réservation sera réessayée plus tard.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">Check-in client</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="clientName" placeholder="Nom" onChange={handleChange} className="border p-2 w-full" />
        <input name="email" placeholder="Email" onChange={handleChange} type="email" className="border p-2 w-full" />
        <input name="phone" placeholder="Téléphone" onChange={handleChange} type="tel" className="border p-2 w-full" />
        <input name="clientAddress" placeholder="Adresse" onChange={handleChange} className="border p-2 w-full" />
        <input name="licenseNumber" placeholder="Numéro de permis" onChange={handleChange} className="border p-2 w-full" />

        <label className="block">Permis de conduire</label>
        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'driverLicensePhotos')} className="border p-2 w-full" />

        <label className="block">Carte d'identité</label>
        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'idCardPhotos')} className="border p-2 w-full" />

        <label className="block">Signature</label>
        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'signature')} className="border p-2 w-full" />

        <input name="latitude" placeholder="Latitude" onChange={handleChange} className="border p-2 w-full" />
        <input name="longitude" placeholder="Longitude" onChange={handleChange} className="border p-2 w-full" />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Valider</button>
      </form>
    </div>
  );
};

export default ClientCheckInPage;
