import React, { useState } from 'react';

const AdminVehicles = ({ vehicles, onAddVehicle, onEditVehicle, onDeleteVehicle }) => {
  const [newVehicle, setNewVehicle] = useState({
    brand: '',
    model: '',
    plate: '',
    photo: ''
  });

  const [editingVehicleId, setEditingVehicleId] = useState(null);
  const [editData, setEditData] = useState({
    brand: '',
    model: '',
    plate: '',
    photo: ''
  });

  const handleChange = (e, isEdit = false) => {
    const { name, value } = e.target;
    if (isEdit) {
      setEditData(prev => ({ ...prev, [name]: value }));
    } else {
      setNewVehicle(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePhotoChange = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (isEdit) {
        setEditData(prev => ({ ...prev, photo: reader.result }));
      } else {
        setNewVehicle(prev => ({ ...prev, photo: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    if (newVehicle.brand && newVehicle.model && newVehicle.plate) {
      onAddVehicle({ ...newVehicle, id: Date.now().toString() });
      setNewVehicle({ brand: '', model: '', plate: '', photo: '' });
    }
  };

  const handleEditClick = (vehicle) => {
    setEditingVehicleId(vehicle.id);
    setEditData(vehicle);
  };

  const handleEditSubmit = () => {
    onEditVehicle(editData);
    setEditingVehicleId(null);
    setEditData({ brand: '', model: '', plate: '', photo: '' });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Gestion des véhicules</h2>

      {/* Ajouter un véhicule */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-semibold mb-2">Ajouter un véhicule</h3>
        <input
          name="brand"
          placeholder="Marque"
          value={newVehicle.brand}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <input
          name="model"
          placeholder="Modèle"
          value={newVehicle.model}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <input
          name="plate"
          placeholder="Plaque d’immatriculation"
          value={newVehicle.plate}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <input type="file" accept="image/*" onChange={(e) => handlePhotoChange(e)} className="mb-2" />
        {newVehicle.photo && (
          <img src={newVehicle.photo} alt="Prévisualisation" className="w-32 h-auto mb-2" />
        )}
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded">
          Ajouter
        </button>
      </div>

      {/* Liste des véhicules */}
      <div>
        <h3 className="font-semibold mb-2">Liste des véhicules</h3>
        {vehicles.length === 0 ? (
          <p>Aucun véhicule enregistré.</p>
        ) : (
          <ul className="space-y-4">
            {vehicles.map((vehicle) => (
              <li key={vehicle.id} className="p-4 bg-white shadow rounded">
                {editingVehicleId === vehicle.id ? (
                  <div className="space-y-2">
                    <input name="brand" value={editData.brand} onChange={(e) => handleChange(e, true)} className="border p-2 w-full" placeholder="Marque" />
                    <input name="model" value={editData.model} onChange={(e) => handleChange(e, true)} className="border p-2 w-full" placeholder="Modèle" />
                    <input name="plate" value={editData.plate} onChange={(e) => handleChange(e, true)} className="border p-2 w-full" placeholder="Plaque" />
                    <input type="file" accept="image/*" onChange={(e) => handlePhotoChange(e, true)} />
                    {editData.photo && <img src={editData.photo} alt="Véhicule" className="w-32 mt-2 rounded" />}
                    <div className="flex gap-2 mt-2">
                      <button onClick={handleEditSubmit} className="bg-green-600 text-white px-4 py-1 rounded">Enregistrer</button>
                      <button onClick={() => setEditingVehicleId(null)} className="text-gray-500">Annuler</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <p><strong>{vehicle.brand} {vehicle.model}</strong></p>
                      <p>Plaque : {vehicle.plate}</p>
                      {vehicle.photo && <img src={vehicle.photo} alt="Véhicule" className="w-32 mt-2" />}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditClick(vehicle)} className="text-blue-600">Modifier</button>
                      <button onClick={() => onDeleteVehicle(vehicle.id)} className="text-red-600 font-bold">Supprimer</button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminVehicles;
