// src/components/AdminReservations.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchReservations();
    fetchVehicles();
  }, []);

  const fetchReservations = async () => {
    const { data, error } = await supabase.from('reservations').select('*');
    if (!error) setReservations(data);
  };

  const fetchVehicles = async () => {
    const { data, error } = await supabase.from('vehicles').select('*');
    if (!error) setVehicles(data);
  };

  const getVehicleInfo = (vehicleId) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle ? `${vehicle.brand} ${vehicle.model} (${vehicle.plate})` : 'Non défini';
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Gestion des réservations</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Nom du client</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Téléphone</th>
            <th className="py-2 px-4 border">Véhicule</th>
            <th className="py-2 px-4 border">Départ</th>
            <th className="py-2 px-4 border">Retour prévu</th>
            <th className="py-2 px-4 border">Retour réel</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r) => (
            <tr key={r.id} className="text-center">
              <td className="py-2 px-4 border">{r.clientName}</td>
              <td className="py-2 px-4 border">{r.email}</td>
              <td className="py-2 px-4 border">{r.phone}</td>
              <td className="py-2 px-4 border">{getVehicleInfo(r.vehicleId)}</td>
              <td className="py-2 px-4 border">{r.startDate}</td>
              <td className="py-2 px-4 border">{r.expectedReturnDate}</td>
              <td className="py-2 px-4 border">{r.actualReturnDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReservations;
