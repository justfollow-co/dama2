import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { FaUser, FaUserShield, FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    const adminEmail = 'contact@justfollow.co';

    if (isAdmin) {
      if (email !== adminEmail) {
        alert('Email administrateur invalide.');
        setLoading(false);
        return;
      }

      // Connexion avec email/mot de passe
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert('Erreur de connexion : ' + error.message);
        setLoading(false);
        return;
      }

      // Tu peux ici vérifier le rôle en BDD (table profiles)
      navigate('/admin');
    } else {
      // Vérifie si le mail existe dans les réservations
      const { data, error } = await supabase
        .from('reservations')
        .select('email')
        .eq('email', email)
        .single();

      if (error || !data) {
        alert('Aucune réservation trouvée avec cet email.');
        setLoading(false);
        return;
      }

      // Envoie du Magic Link
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (otpError) {
        alert('Erreur lors de l’envoi du lien : ' + otpError.message);
      } else {
        alert('Un lien de connexion a été envoyé par email.');
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-blue-600 text-white text-center py-4 text-xl font-bold shadow">
        🚗 DAMALOC
      </header>

      <main className="flex flex-1 justify-center items-center p-4">
        <div className="bg-white rounded-lg shadow p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-2 text-center">Connexion</h2>
          <p className="text-center text-gray-500 mb-6">
            {isAdmin ? "Administration DAMALOC" : "Accédez à votre réservation"}
          </p>

          {/* Choix mode */}
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setIsAdmin(false)}
              className={`flex-1 py-2 border rounded-l ${!isAdmin ? 'bg-blue-600 text-white' : 'bg-gray-100 text-black'}`}
            >
              <FaUser className="inline mr-1" />
              Client
            </button>
            <button
              onClick={() => setIsAdmin(true)}
              className={`flex-1 py-2 border rounded-r ${isAdmin ? 'bg-red-600 text-white' : 'bg-gray-100 text-black'}`}
            >
              <FaUserShield className="inline mr-1" />
              Admin
            </button>
          </div>

          {/* Email */}
          <label className="block mb-2 text-sm">
            {isAdmin ? 'Email administrateur' : 'Email de réservation'}
          </label>
          <div className="flex items-center border rounded px-3 py-2 mb-4">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
  type="email"
  className="w-full focus:outline-none"
  placeholder={isAdmin ? 'Email administrateur' : 'Email de réservation'}
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
          </div>

          {/* Mot de passe admin */}
          {isAdmin && (
            <>
              <label className="block mb-2 text-sm">Mot de passe</label>
              <div className="flex items-center border rounded px-3 py-2 mb-4">
                <FaLock className="text-gray-400 mr-2" />
                <input
                  type="password"
                  className="w-full focus:outline-none"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full py-2 rounded font-semibold ${isAdmin ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
          >
            {loading ? 'Connexion...' : `Se connecter (${isAdmin ? 'Admin' : 'Client'})`}
          </button>

          {/* Info mode */}
          <div className="mt-4 text-center text-sm">
            {isAdmin ? (
              <p className="text-red-700 bg-red-100 p-2 rounded">
                <strong>Mode admin</strong> : admin@damaloc.fr / mot de passe requis
              </p>
            ) : (
              <p className="text-blue-700 bg-blue-100 p-2 rounded">
                <strong>Mode client</strong> : lien magique envoyé par email
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
