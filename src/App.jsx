import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Login from './components/Login';
import ClientCheckInPage from './components/ClientCheckInPage';
import AdminDashboard from './components/AdminDashboard';
import AdminVehicles from './components/AdminVehicles';
import AdminAddReservation from './components/AdminAddReservation';
import AdminReservations from './components/AdminReservations';

function App() {
  const [session, setSession] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchSessionAndRole = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (!error && profile) {
          setRole(profile.role);
        }
      }
    };

    fetchSessionAndRole();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      if (session) {
        supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single()
          .then(({ data, error }) => {
            if (!error && data) {
              setRole(data.role);
            }
          });
      } else {
        setRole(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <Router>
      <Routes>
        {/* === Routes publiques === */}
        <Route path="/" element={<Login />} />
        <Route path="/checkin" element={<ClientCheckInPage />} />

        {/* === Routes admin protégées === */}
        <Route
          path="/dashboard"
          element={session && role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/vehicles"
          element={session && role === 'admin' ? <AdminVehicles /> : <Navigate to="/" />}
        />
        <Route
          path="/add-reservation"
          element={session && role === 'admin' ? <AdminAddReservation /> : <Navigate to="/" />}
        />
        <Route
          path="/reservations"
          element={session && role === 'admin' ? <AdminReservations /> : <Navigate to="/" />}
        />

        {/* Redirection par défaut */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
