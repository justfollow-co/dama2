import React, { useState, useEffect } from 'react';

const AdminAddReservation = ({ onSave, onBack, vehicles = [] }) => {
  const [reservation, setReservation] = useState({
    clientName: '',
    email: '',
    phone: '',
    startDate: '',
    expectedReturnDate: '',
    actualReturnDate: '',
    vehicleId: ''
  });

  useEffect(() => {
    if (reservation.expectedReturnDate) {
      setReservation((prev) => ({
        ...prev,
        actualReturnDate: prev.actualReturnDate || prev.expectedReturnDate
      }));
    }
  }, [reservation.expectedReturnDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(reservation);
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Ajouter une réservation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1 font-medium">Nom du client</label>
          <input name="clientName" placeholder="Nom du client" value={reservation.clientName} onChange={handleChange} className="border p-2 w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Adresse email</label>
          <input name="email" placeholder="Adresse email" type="email" value={reservation.email} onChange={handleChange} className="border p-2 w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Téléphone</label>
          <input name="phone" placeholder="Téléphone" type="tel" value={reservation.phone} onChange={handleChange} className="border p-2 w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Date de départ</label>
          <input name="startDate" type="date" value={reservation.startDate} onChange={handleChange} className="border p-2 w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Date de retour prévue</label>
          <input name="expectedReturnDate" type="date" value={reservation.expectedReturnDate} onChange={handleChange} className="border p-2 w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Date de retour réelle</label>
          <input name="actualReturnDate" type="date" value={reservation.actualReturnDate} onChange={handleChange} className="border p-2 w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Véhicule</label>
          <select name="vehicleId" value={reservation.vehicleId} onChange={handleChange} className="border p-2 w-full">
            <option value="">Sélectionner un véhicule</option>
            {vehicles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.brand} {v.model} - {v.plate}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between">
          <button type="button" onClick={onBack} className="text-gray-500">Annuler</button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Enregistrer</button>
        </div>

      </form>
    </div>
  );
};

export default AdminAddReservation;
