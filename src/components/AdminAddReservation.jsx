import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AdminAddReservation = ({ onBack, fetchReservations }) => {
  const [vehicles, setVehicles] = useState([]);
  const [reservation, setReservation] = useState({
    clientName: '',
    email: '',
    phone: '',
    startDate: '',
    expectedReturnDate: '',
    actualReturnDate: '',
    vehicleId: '',
    clientAddress: '',
    licenseNumber: '',
    driverLicensePhotos: '',
    idCardPhotos: '',
    signature: '',
    latitude: '',
    longitude: ''
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    if (reservation.expectedReturnDate) {
      setReservation((prev) => ({
        ...prev,
        actualReturnDate: prev.actualReturnDate || prev.expectedReturnDate
      }));
    }
  }, [reservation.expectedReturnDate]);

  const fetchVehicles = async () => {
    const { data, error } = await supabase.from('vehicles').select('*');
    if (!error) setVehicles(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setReservation((prev) => ({ ...prev, [field]: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('reservations').insert([reservation]);
    if (error) {
      console.error("Erreur lors de l'ajout :", error.message);
    } else {
      if (typeof fetchReservations === 'function') fetchReservations();
      onBack();
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Ajouter une réservation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label>Nom du client</label>
        <input name="clientName" value={reservation.clientName} onChange={handleChange} className="border p-2 w-full" />

        <label>Adresse email</label>
        <input name="email" value={reservation.email} onChange={handleChange} type="email" className="border p-2 w-full" />

        <label>Téléphone</label>
        <input name="phone" value={reservation.phone} onChange={handleChange} type="tel" className="border p-2 w-full" />

        <label>Adresse du client</label>
        <input name="clientAddress" value={reservation.clientAddress} onChange={handleChange} className="border p-2 w-full" />

        <label>Numéro de permis</label>
        <input name="licenseNumber" value={reservation.licenseNumber} onChange={handleChange} className="border p-2 w-full" />

        <label>Date de départ</label>
        <input name="startDate" type="date" value={reservation.startDate} onChange={handleChange} className="border p-2 w-full" />

        <label>Date de retour prévue</label>
        <input name="expectedReturnDate" type="date" value={reservation.expectedReturnDate} onChange={handleChange} className="border p-2 w-full" />

        <label>Date de retour réelle</label>
        <input name="actualReturnDate" type="date" value={reservation.actualReturnDate} onChange={handleChange} className="border p-2 w-full" />

        <label>Latitude</label>
        <input name="latitude" value={reservation.latitude} onChange={handleChange} className="border p-2 w-full" />

        <label>Longitude</label>
        <input name="longitude" value={reservation.longitude} onChange={handleChange} className="border p-2 w-full" />

        <label>Photo permis de conduire</label>
        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'driverLicensePhotos')} className="border p-2 w-full" />

        <label>Photo carte d'identité</label>
        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'idCardPhotos')} className="border p-2 w-full" />

        <label>Signature (image)</label>
        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'signature')} className="border p-2 w-full" />

        <label>Véhicule</label>
        <select name="vehicleId" value={reservation.vehicleId} onChange={handleChange} className="border p-2 w-full">
          <option value="">Sélectionner un véhicule</option>
          {vehicles.map(v => (
            <option key={v.id} value={v.id}>{v.brand} {v.model} - {v.plate}</option>
          ))}
        </select>

        <div className="flex justify-between">
          <button type="button" onClick={onBack} className="text-gray-500">Annuler</button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Enregistrer</button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddReservation;
