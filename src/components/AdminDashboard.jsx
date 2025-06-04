// src/components/AdminDashboard.jsx
import React from 'react';

const AdminDashboard = ({ reservations, onViewReservation, onAddReservation }) => {
  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Réservations</h2>
        <button
          onClick={onAddReservation}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Nouvelle réservation
        </button>
        <button
  onClick={() => setCurrentAdminView('reservations')}
  className="text-sm text-blue-600 hover:underline"
>
  Voir les réservations
</button>

      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Nom</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Téléphone</th>
            <th className="py-2 px-4 border">Véhicule</th>
            <th className="py-2 px-4 border">Départ</th>
            <th className="py-2 px-4 border">Retour prévu</th>
            <th className="py-2 px-4 border">Retour réel</th>
            <th className="py-2 px-4 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r) => (
            <tr key={r.id} className="text-center">
              <td className="py-2 px-4 border">{r.clientName}</td>
              <td className="py-2 px-4 border">{r.email}</td>
              <td className="py-2 px-4 border">{r.phone}</td>
              <td className="py-2 px-4 border">{r.vehicleId}</td>
              <td className="py-2 px-4 border">{r.startDate}</td>
              <td className="py-2 px-4 border">{r.expectedReturnDate}</td>
              <td className="py-2 px-4 border">{r.actualReturnDate}</td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => onViewReservation(r.id)}
                  className="text-blue-600 hover:underline"
                >
                  Voir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
