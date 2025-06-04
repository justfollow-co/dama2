import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient.js';

const AdminVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
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

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    const { data, error } = await supabase.from('vehicles').select('*');
    if (error) {
      console.error('Erreur fetch :', error.message);
    } else {
      setVehicles(data);
    }
  };

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
      const result = reader.result;
      if (isEdit) {
        setEditData(prev => ({ ...prev, photo: result }));
      } else {
        setNewVehicle(prev => ({ ...prev, photo: result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const addVehicle = async () => {
    if (newVehicle.brand && newVehicle.model && newVehicle.plate) {
      const { error } = await supabase.from('vehicles').insert([newVehicle]);
      if (error) {
        console.error('Erreur ajout :', error.message);
      } else {
        setNewVehicle({ brand: '', model: '', plate: '', photo: '' });
        fetchVehicles();
      }
    }
  };

  const updateVehicle = async () => {
    const { error } = await supabase
      .from('vehicles')
      .update(editData)
      .eq('id', editingVehicleId);
    if (error) {
      console.error('Erreur modification :', error.message);
    } else {
      setEditingVehicleId(null);
      setEditData({ brand: '', model: '', plate: '', photo: '' });
      fetchVehicles();
    }
  };

  const deleteVehicle = async (id) => {
    const { error } = await supabase.from('vehicles').delete().eq('id', id);
    if (error) {
      console.error('Erreur suppression :', error.message);
    } else {
      fetchVehicles();
    }
  };

  const handleEditClick = (vehicle) => {
    setEditingVehicleId(vehicle.id);
    setEditData(vehicle);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Gestion des véhicules</h2>

      {/* Ajout */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-semibold mb-2">Ajouter un véhicule</h3>
        <input name="brand" value={newVehicle.brand} onChange={handleChange} placeholder="Marque" className="border p-2 w-full mb-2" />
        <input name="model" value={newVehicle.model} onChange={handleChange} placeholder="Modèle" className="border p-2 w-full mb-2" />
        <input name="plate" value={newVehicle.plate} onChange={handleChange} placeholder="Plaque" className="border p-2 w-full mb-2" />
        <input type="file" accept="image/*" onChange={handlePhotoChange} className="mb-2" />
        {newVehicle.photo && <img src={newVehicle.photo} className="w-32" alt="Prévisu" />}
        <button onClick={addVehicle} className="bg-blue-600 text-white px-4 py-2 rounded">Ajouter</button>
      </div>

      {/* Liste */}
      <h3 className="font-semibold mb-2">Liste des véhicules</h3>
      <ul className="space-y-4">
        {vehicles.map((v) => (
          <li key={v.id} className="bg-white p-4 rounded shadow">
            {editingVehicleId === v.id ? (
              <div className="space-y-2">
                <input name="brand" value={editData.brand} onChange={(e) => handleChange(e, true)} className="border p-2 w-full" />
                <input name="model" value={editData.model} onChange={(e) => handleChange(e, true)} className="border p-2 w-full" />
                <input name="plate" value={editData.plate} onChange={(e) => handleChange(e, true)} className="border p-2 w-full" />
                <input type="file" onChange={(e) => handlePhotoChange(e, true)} />
                {editData.photo && <img src={editData.photo} className="w-32 mt-2" alt="photo" />}
                <div className="flex gap-2 mt-2">
                  <button onClick={updateVehicle} className="bg-green-600 text-white px-4 py-1 rounded">Valider</button>
                  <button onClick={() => setEditingVehicleId(null)} className="text-gray-500">Annuler</button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between">
                <div>
                  <p><strong>{v.brand} {v.model}</strong></p>
                  <p>Plaque : {v.plate}</p>
                  {v.photo && <img src={v.photo} className="w-32 mt-2" alt="vhl" />}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEditClick(v)} className="text-blue-600">Modifier</button>
                  <button onClick={() => deleteVehicle(v.id)} className="text-red-600">Supprimer</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminVehicles;
