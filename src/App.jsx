import React, { useState } from 'react';
import { Camera, MapPin, FileText, AlertTriangle, Mail, Car, CheckCircle, Info, Clock, Globe, Users, Plus, Upload, Search, Eye, Settings, X, ChevronLeft, ChevronRight, Home, LogOut, Truck } from 'lucide-react';
import AdminVehicles from './components/AdminVehicles.jsx';
import AdminAddReservation from './components/AdminAddReservation.jsx';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentAdminView, setCurrentAdminView] = useState('dashboard');
  const [userEmail, setUserEmail] = useState('');
  
  const [reservations, setReservations] = useState([
    {
      id: '1',
      clientEmail: 'jean.dupont@email.com',
      clientName: 'Jean Dupont',
      clientPhone: '06 12 34 56 78',
    clientAddress: '123 rue de la République, 75001 Paris',
    licenseNumber: 'B12345678',
    driverLicense: 'license-data',
    idCard: 'id-data',
      carModel: 'Peugeot 208',
      carPlate: 'AB-123-CD',
      pickupDate: new Date('2024-06-02T10:00:00').toISOString(),
      returnDate: new Date('2024-06-09T10:00:00').toISOString(),
      status: 'completed',
      extPhotos: ['photo1', 'photo2', 'photo3', 'photo4', 'photo5'],
      intPhotos: ['int1', 'int2', 'int3', 'int4'],
      extPhotosExif: [
        { timestamp: new Date().toISOString(), camera: 'iPhone 14', fileSize: 2048576, location: { lat: 48.8566, lng: 2.3522 } }
      ],
      intPhotosExif: [
        { timestamp: new Date().toISOString(), camera: 'iPhone 14', fileSize: 1765432, location: { lat: 48.8566, lng: 2.3522 } }
      ],
      signature: 'signature-data',
      latitude: 48.8566,
      longitude: 2.3522,
      price: 350,
      notes: 'Check-in effectué sans problème'
    },
    {
      id: '2',
      clientEmail: 'marie.martin@email.com',
      clientName: 'Marie Martin',
      clientPhone: '06 98 76 54 32',
      carModel: 'Renault Clio',
      carPlate: 'EF-456-GH',
      pickupDate: new Date('2024-06-03T14:00:00').toISOString(),
      returnDate: new Date('2024-06-10T14:00:00').toISOString(),
      status: 'pending',
      extPhotos: [],
      intPhotos: [],
      extPhotosExif: [],
      intPhotosExif: [],
      signature: '',
      latitude: null,
      longitude: null,
      price: 280,
      notes: 'En attente de check-in'
    }
  ]);
  
  const [booking, setBooking] = useState({
    id: '1',
    clientEmail: '',
    clientName: 'Jean Dupont',
    carModel: 'Peugeot 208',
    pickupDate: new Date().toISOString(),
    status: 'pending',
    extPhotos: [],
    intPhotos: [],
    extPhotosExif: [],
    intPhotosExif: [],
    signature: '',
    latitude: null,
    longitude: null
  });

  // Ajout de l'état pour les véhicules
  const [vehicles, setVehicles] = useState([
    {
      id: '1',
      brand: 'Peugeot',
      model: '208',
      plate: 'AB-123-CD',
      photo: ''
    },
    {
      id: '2',
      brand: 'Renault',
      model: 'Clio',
      plate: 'EF-456-GH',
      photo: ''
    }
  ]);

  const handleLogin = (email, adminMode = false) => {
    setUserEmail(email);
    setIsAdmin(adminMode);
    if (!adminMode) {
      const userBooking = reservations.find(r => r.clientEmail.toLowerCase() === email.toLowerCase());
      if (userBooking) {
        setBooking(userBooking);
      } else {
        setBooking(prev => ({...prev, clientEmail: email}));
      }
    }
    setIsLoggedIn(true);
    setCurrentAdminView(adminMode ? 'admin-dashboard' : 'dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserEmail('');
    setCurrentAdminView('dashboard');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-blue-600 text-white p-4 shadow-lg">
          <div className="max-w-4xl mx-auto flex items-center justify-center">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Car className="w-6 h-6" />
              DAMALOC
            </h1>
          </div>
        </header>
        <main className="max-w-4xl mx-auto p-4">
          <LoginView onLogin={handleLogin} />
        </main>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <div className="flex min-h-screen">
        <aside className="w-64 bg-gray-800 text-white flex flex-col">
          <div className="p-4 flex items-center justify-center bg-gray-900">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Settings className="w-6 h-6" />
              DAMALOC
            </h1>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <button onClick={() => setCurrentAdminView('dashboard')} className={`flex items-center gap-2 p-2 rounded hover:bg-gray-700 transition ${currentAdminView === 'dashboard' ? 'bg-gray-700' : ''}`}>
              <Home className="w-5 h-5" />
              Dashboard
            </button>
            <button onClick={() => setCurrentAdminView('vehicles')} className={`flex items-center gap-2 p-2 rounded hover:bg-gray-700 transition ${currentAdminView === 'vehicles' ? 'bg-gray-700' : ''}`}>
              <Truck className="w-5 h-5" />
              Gestion des véhicules
            </button>
            <button onClick={() => setCurrentAdminView('add-reservation')} className={`flex items-center gap-2 p-2 rounded hover:bg-gray-700 transition ${currentAdminView === 'add-reservation' ? 'bg-gray-700' : ''}`}>
              <Plus className="w-5 h-5" />
              Nouvelle réservation
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 p-2 rounded hover:bg-gray-700 transition">
              <LogOut className="w-5 h-5" />
              Déconnexion
            </button>
          </nav>
        </aside>
        <main className="flex-1 p-6 bg-gray-100">
          {currentAdminView === 'dashboard' && <AdminDashboard reservations={reservations} onViewReservation={(id) => {
            const reservation = reservations.find(r => r.id === id);
            if (reservation) {
              setBooking(reservation);
              setCurrentAdminView('admin-details');
            }
          }} onAddReservation={() => setCurrentAdminView('add-reservation')} />}
          {currentAdminView === 'vehicles' && <AdminVehicles vehicles={vehicles} onAddVehicle={handleAddVehicle} onEditVehicle={handleEditVehicle} onDeleteVehicle={handleDeleteVehicle} />}
          {currentAdminView === 'add-reservation' && (
  <AdminAddReservation
    vehicles={vehicles} // ✅ On passe les véhicules ici
    onSave={(newReservation) => {
      setReservations(prev => [...prev, { ...newReservation, id: Date.now().toString() }]);
      setCurrentAdminView('dashboard');
    }}
    onBack={() => setCurrentAdminView('dashboard')}
  />
)}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Car className="w-6 h-6" />
            DAMALOC
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm">{userEmail}</span>
            <button 
              onClick={handleLogout}
              className="text-sm hover:text-blue-200 transition-colors bg-blue-700 px-3 py-1 rounded"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-4">
        {currentAdminView === 'dashboard' && (
          <DashboardView 
            booking={booking}
            onStartPickup={() => setCurrentAdminView('pickup')}
            onViewContract={() => setCurrentAdminView('contract')}
            onReportIncident={() => setCurrentAdminView('incident')}
          />
        )}
        {currentAdminView === 'pickup' && (
          <PickupProcess 
            booking={booking}
            onComplete={(data) => {
              setBooking(prev => ({...prev, ...data, status: 'completed'}));
              setCurrentAdminView('dashboard');
            }}
            onBack={() => setCurrentAdminView('dashboard')}
          />
        )}
        {currentAdminView === 'contract' && (
          <ContractView booking={booking} onBack={() => setCurrentAdminView('dashboard')} />
        )}
        {currentAdminView === 'incident' && (
          <IncidentForm 
            onComplete={() => {
              setBooking(prev => ({...prev, status: 'incident'}));
              setCurrentAdminView('dashboard');
            }}
            onBack={() => setCurrentAdminView('dashboard')}
          />
        )}
      </main>
    </div>
  );
};

const LoginView = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginMode, setLoginMode] = useState('client');

  const handleLoginClick = () => {
    if (!email || !email.trim()) {
      alert('Veuillez entrer un email valide');
      return;
    }
    
    if (loginMode === 'admin' && email.toLowerCase() !== 'admin@damaloc.fr') {
      alert('Accès administrateur refusé. Utilisez admin@damaloc.fr');
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      onLogin(email.trim(), loginMode === 'admin');
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Connexion</h2>
          <p className="text-gray-600">
            {loginMode === 'admin' ? 'Administration DAMALOC' : 'Accédez à votre réservation'}
          </p>
        </div>
        
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setLoginMode('client')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              loginMode === 'client'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            👤 Client
          </button>
          <button
            onClick={() => setLoginMode('admin')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              loginMode === 'admin'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            👨‍💼 Admin
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-3">
              {loginMode === 'admin' ? 'Email administrateur' : 'Email de réservation'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder={loginMode === 'admin' ? 'admin@damaloc.fr' : 'votre@email.com'}
                disabled={isSubmitting}
              />
            </div>
          </div>
          
          <button
            onClick={handleLoginClick}
            disabled={isSubmitting}
            className={`w-full font-semibold py-3 px-4 rounded-lg focus:ring-4 transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none ${
              loginMode === 'admin'
                ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-200'
                : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-200'
            }`}
          >
            {isSubmitting ? 'Connexion...' : `Se connecter${loginMode === 'admin' ? ' (Admin)' : ''}`}
          </button>
          
          <div className={`border rounded-lg p-4 ${
            loginMode === 'admin' ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'
          }`}>
            {loginMode === 'admin' ? (
              <p className="text-xs text-red-700 text-center">
                <strong>Mode admin :</strong> admin@damaloc.fr
              </p>
            ) : (
              <p className="text-xs text-blue-700 text-center">
                <strong>Mode démo :</strong> Entrez n'importe quel email
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardView = ({ booking, onStartPickup, onViewContract, onReportIncident }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'incident': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Terminé';
      case 'incident': return 'Incident déclaré';
      default: return 'En attente';
    }
  };

  return (
    <div className="space-y-6 mt-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Tableau de bord</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">Client :</span>
              <span className="font-semibold">{booking.clientName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">Email :</span>
              <span className="font-semibold">{booking.clientEmail}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">Véhicule :</span>
              <span className="font-semibold">{booking.carModel}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">Date :</span>
              <span className="font-semibold">{new Date(booking.pickupDate).toLocaleDateString('fr-FR')}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">Statut :</span>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(booking.status)}`}>
                {getStatusText(booking.status)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {booking.status === 'pending' && (
          <button
            onClick={onStartPickup}
            className="bg-blue-600 text-white p-6 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg flex flex-col items-center gap-4"
          >
            <Camera className="w-10 h-10" />
            <div className="text-center">
              <div className="font-bold text-lg">Commencer</div>
              <div className="text-sm opacity-90">le check-in</div>
            </div>
          </button>
        )}
        
        {booking.status === 'completed' && (
          <button
            onClick={onViewContract}
            className="bg-green-600 text-white p-6 rounded-lg hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg flex flex-col items-center gap-4"
          >
            <FileText className="w-10 h-10" />
            <div className="text-center">
              <div className="font-bold text-lg">Voir le contrat</div>
              <div className="text-sm opacity-90">PDF généré</div>
            </div>
          </button>
        )}

        <button
          onClick={onReportIncident}
          className="bg-orange-600 text-white p-6 rounded-lg hover:bg-orange-700 transition-all transform hover:scale-105 shadow-lg flex flex-col items-center gap-4"
        >
          <AlertTriangle className="w-10 h-10" />
          <div className="text-center">
            <div className="font-bold text-lg">Déclarer</div>
            <div className="text-sm opacity-90">un sinistre</div>
          </div>
        </button>
      </div>
    </div>
  );
};

const PickupProcess = ({ booking, onComplete, onBack }) => {
  const [step, setStep] = useState(1);
  const [extPhotos, setExtPhotos] = useState([]);
  const [intPhotos, setIntPhotos] = useState([]);
  const [location, setLocation] = useState(null);
  const [signature, setSignature] = useState('');
  const [code, setCode] = useState('');
  const [extDamageNotes, setExtDamageNotes] = useState('');
  const [currentPhotoGuide, setCurrentPhotoGuide] = useState(0);
  const [driverLicensePhotos, setDriverLicensePhotos] = useState([]);
  const [idCardPhotos, setIdCardPhotos] = useState([]);
  const [clientInfo, setClientInfo] = useState({
    address: '',
    phone: '',
    licenseNumber: ''
  });
  const canvasRef = React.useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Guide photos avec illustrations SVG simples
  const photoGuides = [
    { 
      title: "Avant du véhicule", 
      description: "Face avant complète avec plaque",
      icon: "🚗",
      svg: (
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <rect x="40" y="20" width="120" height="60" fill="#e5e7eb" stroke="#6b7280" strokeWidth="2" rx="10"/>
          <rect x="45" y="70" width="20" height="10" fill="#374151" rx="2"/>
          <rect x="135" y="70" width="20" height="10" fill="#374151" rx="2"/>
          <rect x="80" y="25" width="40" height="15" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1"/>
          <circle cx="60" cy="35" r="8" fill="#fff" stroke="#6b7280" strokeWidth="2"/>
          <circle cx="140" cy="35" r="8" fill="#fff" stroke="#6b7280" strokeWidth="2"/>
          <text x="100" y="95" textAnchor="middle" fontSize="12" fill="#ef4444" fontWeight="bold">AVANT</text>
        </svg>
      )
    },
    {
      title: "Côté conducteur",
      description: "Vue latérale gauche complète",
      icon: "👈",
      svg: (
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <rect x="20" y="30" width="160" height="40" fill="#e5e7eb" stroke="#6b7280" strokeWidth="2" rx="8"/>
          <rect x="30" y="60" width="30" height="10" fill="#374151" rx="2"/>
          <rect x="140" y="60" width="30" height="10" fill="#374151" rx="2"/>
          <rect x="70" y="35" width="50" height="20" fill="#60a5fa" stroke="#3b82f6" strokeWidth="1"/>
          <circle cx="50" cy="45" r="6" fill="#fff" stroke="#6b7280" strokeWidth="2"/>
          <text x="100" y="90" textAnchor="middle" fontSize="12" fill="#ef4444" fontWeight="bold">GAUCHE</text>
        </svg>
      )
    },
    {
      title: "Arrière du véhicule",
      description: "Face arrière avec plaque",
      icon: "🚙",
      svg: (
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <rect x="40" y="20" width="120" height="60" fill="#e5e7eb" stroke="#6b7280" strokeWidth="2" rx="10"/>
          <rect x="45" y="70" width="20" height="10" fill="#374151" rx="2"/>
          <rect x="135" y="70" width="20" height="10" fill="#374151" rx="2"/>
          <rect x="80" y="55" width="40" height="15" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1"/>
          <rect x="55" y="35" width="20" height="15" fill="#ef4444" rx="2"/>
          <rect x="125" y="35" width="20" height="15" fill="#ef4444" rx="2"/>
          <text x="100" y="95" textAnchor="middle" fontSize="12" fill="#ef4444" fontWeight="bold">ARRIÈRE</text>
        </svg>
      )
    },
    {
      title: "Côté passager",
      description: "Vue latérale droite complète",
      icon: "👉",
      svg: (
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <rect x="20" y="30" width="160" height="40" fill="#e5e7eb" stroke="#6b7280" strokeWidth="2" rx="8"/>
          <rect x="30" y="60" width="30" height="10" fill="#374151" rx="2"/>
          <rect x="140" y="60" width="30" height="10" fill="#374151" rx="2"/>
          <rect x="80" y="35" width="50" height="20" fill="#60a5fa" stroke="#3b82f6" strokeWidth="1"/>
          <circle cx="150" cy="45" r="6" fill="#fff" stroke="#6b7280" strokeWidth="2"/>
          <text x="100" y="90" textAnchor="middle" fontSize="12" fill="#ef4444" fontWeight="bold">DROITE</text>
        </svg>
      )
    },
    {
      title: "Avant gauche (3/4)",
      description: "Angle avant-gauche",
      icon: "↖️",
      svg: (
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <rect x="50" y="25" width="100" height="50" fill="#e5e7eb" stroke="#6b7280" strokeWidth="2" rx="8" transform="rotate(-10 100 50)"/>
          <circle cx="70" cy="40" r="6" fill="#fff" stroke="#6b7280" strokeWidth="2"/>
          <text x="100" y="90" textAnchor="middle" fontSize="12" fill="#ef4444" fontWeight="bold">3/4 AV-G</text>
        </svg>
      )
    },
    {
      title: "Avant droit (3/4)",
      description: "Angle avant-droit",
      icon: "↗️",
      svg: (
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <rect x="50" y="25" width="100" height="50" fill="#e5e7eb" stroke="#6b7280" strokeWidth="2" rx="8" transform="rotate(10 100 50)"/>
          <circle cx="130" cy="40" r="6" fill="#fff" stroke="#6b7280" strokeWidth="2"/>
          <text x="100" y="90" textAnchor="middle" fontSize="12" fill="#ef4444" fontWeight="bold">3/4 AV-D</text>
        </svg>
      )
    },
    {
      title: "Arrière gauche (3/4)",
      description: "Angle arrière-gauche",
      icon: "↙️",
      svg: (
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <rect x="50" y="25" width="100" height="50" fill="#e5e7eb" stroke="#6b7280" strokeWidth="2" rx="8" transform="rotate(-10 100 50)"/>
          <rect x="65" y="45" width="15" height="10" fill="#ef4444" rx="2"/>
          <text x="100" y="90" textAnchor="middle" fontSize="12" fill="#ef4444" fontWeight="bold">3/4 AR-G</text>
        </svg>
      )
    },
    {
      title: "Arrière droit (3/4)",
      description: "Angle arrière-droit",
      icon: "↘️",
      svg: (
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <rect x="50" y="25" width="100" height="50" fill="#e5e7eb" stroke="#6b7280" strokeWidth="2" rx="8" transform="rotate(10 100 50)"/>
          <rect x="120" y="45" width="15" height="10" fill="#ef4444" rx="2"/>
          <text x="100" y="90" textAnchor="middle" fontSize="12" fill="#ef4444" fontWeight="bold">3/4 AR-D</text>
        </svg>
      )
    },
    {
      title: "Toit et capot",
      description: "Vue du dessus",
      icon: "⬆️",
      svg: (
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <rect x="60" y="20" width="80" height="60" fill="#e5e7eb" stroke="#6b7280" strokeWidth="2" rx="4"/>
          <rect x="70" y="25" width="60" height="20" fill="#60a5fa" stroke="#3b82f6" strokeWidth="1"/>
          <rect x="70" y="55" width="60" height="20" fill="#a78bfa" stroke="#8b5cf6" strokeWidth="1"/>
          <text x="100" y="90" textAnchor="middle" fontSize="12" fill="#ef4444" fontWeight="bold">TOIT</text>
        </svg>
      )
    },
    {
      title: "Roues et jantes",
      description: "Chaque roue en détail",
      icon: "⭕",
      svg: (
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <circle cx="50" cy="50" r="25" fill="#374151" stroke="#000" strokeWidth="2"/>
          <circle cx="50" cy="50" r="15" fill="#9ca3af" stroke="#6b7280" strokeWidth="1"/>
          <circle cx="100" cy="50" r="25" fill="#374151" stroke="#000" strokeWidth="2"/>
          <circle cx="100" cy="50" r="15" fill="#9ca3af" stroke="#6b7280" strokeWidth="1"/>
          <circle cx="150" cy="50" r="25" fill="#374151" stroke="#000" strokeWidth="2"/>
          <circle cx="150" cy="50" r="15" fill="#9ca3af" stroke="#6b7280" strokeWidth="1"/>
          <text x="100" y="90" textAnchor="middle" fontSize="12" fill="#ef4444" fontWeight="bold">ROUES</text>
        </svg>
      )
    },
    {
      title: "Pare-chocs avant",
      description: "Détail pare-chocs et calandre",
      icon: "🔲",
      svg: (
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <rect x="30" y="40" width="140" height="20" fill="#e5e7eb" stroke="#6b7280" strokeWidth="2" rx="4"/>
          <rect x="70" y="45" width="60" height="10" fill="#374151" rx="2"/>
          <text x="100" y="80" textAnchor="middle" fontSize="12" fill="#ef4444" fontWeight="bold">PARE-CHOC AV</text>
        </svg>
      )
    },
    {
      title: "Pare-chocs arrière",
      description: "Détail pare-chocs arrière",
      icon: "🔳",
      svg: (
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <rect x="30" y="40" width="140" height="20" fill="#e5e7eb" stroke="#6b7280" strokeWidth="2" rx="4"/>
          <rect x="50" y="45" width="20" height="8" fill="#ef4444" rx="2"/>
          <rect x="130" y="45" width="20" height="8" fill="#ef4444" rx="2"/>
          <text x="100" y="80" textAnchor="middle" fontSize="12" fill="#ef4444" fontWeight="bold">PARE-CHOC AR</text>
        </svg>
      )
    },
    {
      title: "Rétroviseurs",
      description: "Gauche et droit",
      icon: "🔍",
      svg: (
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <ellipse cx="60" cy="50" rx="30" ry="20" fill="#e5e7eb" stroke="#6b7280" strokeWidth="2"/>
          <rect x="85" y="45" width="10" height="10" fill="#374151"/>
          <ellipse cx="140" cy="50" rx="30" ry="20" fill="#e5e7eb" stroke="#6b7280" strokeWidth="2"/>
          <rect x="105" y="45" width="10" height="10" fill="#374151"/>
          <text x="100" y="85" textAnchor="middle" fontSize="12" fill="#ef4444" fontWeight="bold">RÉTROS</text>
        </svg>
      )
    },
    {
      title: "Phares avant",
      description: "État des optiques",
      icon: "💡",
      svg: (
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <circle cx="60" cy="50" r="20" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
          <circle cx="60" cy="50" r="10" fill="#fbbf24"/>
          <circle cx="140" cy="50" r="20" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
          <circle cx="140" cy="50" r="10" fill="#fbbf24"/>
          <text x="100" y="85" textAnchor="middle" fontSize="12" fill="#ef4444" fontWeight="bold">PHARES</text>
        </svg>
      )
    },
    {
      title: "Feux arrière",
      description: "État des feux",
      icon: "🔴",
      svg: (
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <rect x="50" y="40" width="30" height="20" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="4"/>
          <rect x="120" y="40" width="30" height="20" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="4"/>
          <text x="100" y="85" textAnchor="middle" fontSize="12" fill="#ef4444" fontWeight="bold">FEUX AR</text>
        </svg>
      )
    },
    {
      title: "Vitres et pare-brise",
      description: "État du vitrage",
      icon: "🪟",
      svg: (
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <rect x="40" y="30" width="120" height="40" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="4" opacity="0.7"/>
          <line x1="100" y1="30" x2="100" y2="70" stroke="#3b82f6" strokeWidth="1"/>
          <line x1="40" y1="50" x2="160" y2="50" stroke="#3b82f6" strokeWidth="1"/>
          <text x="100" y="85" textAnchor="middle" fontSize="12" fill="#ef4444" fontWeight="bold">VITRES</text>
        </svg>
      )
    },
    {
      title: "Plaque minéralogique",
      description: "Avant et arrière lisibles",
      icon: "🔢",
      svg: (
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <rect x="50" y="40" width="100" height="30" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" rx="4"/>
          <text x="100" y="60" textAnchor="middle" fontSize="16" fill="#000" fontWeight="bold">AB-123-CD</text>
          <text x="100" y="85" textAnchor="middle" fontSize="12" fill="#ef4444" fontWeight="bold">PLAQUES</text>
        </svg>
      )
    },
    {
      title: "Bas de caisse",
      description: "Côtés gauche et droit",
      icon: "➖",
      svg: (
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <rect x="20" y="45" width="160" height="10" fill="#374151" stroke="#000" strokeWidth="2" rx="2"/>
          <rect x="30" y="60" width="30" height="5" fill="#6b7280"/>
          <rect x="140" y="60" width="30" height="5" fill="#6b7280"/>
          <text x="100" y="85" textAnchor="middle" fontSize="12" fill="#ef4444" fontWeight="bold">BAS DE CAISSE</text>
        </svg>
      )
    },
    {
      title: "Éléments spéciaux",
      description: "Antenne, attelage, galerie...",
      icon: "🔧",
      svg: (
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <line x1="80" y1="50" x2="80" y2="20" stroke="#6b7280" strokeWidth="2"/>
          <circle cx="80" cy="20" r="4" fill="#6b7280"/>
          <rect x="110" y="45" width="40" height="10" fill="#6b7280" stroke="#374151" strokeWidth="2" rx="2"/>
          <circle cx="130" cy="60" r="5" fill="#374151"/>
          <text x="100" y="85" textAnchor="middle" fontSize="12" fill="#ef4444" fontWeight="bold">ACCESSOIRES</text>
        </svg>
      )
    },
    {
      title: "Dommages existants",
      description: "Zoom sur rayures/bosses",
      icon: "⚠️",
      svg: (
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <rect x="50" y="30" width="100" height="40" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="4"/>
          <path d="M 70 40 L 90 50 L 70 60" fill="none" stroke="#ef4444" strokeWidth="3"/>
          <circle cx="120" cy="50" r="8" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2"/>
          <text x="100" y="85" textAnchor="middle" fontSize="12" fill="#ef4444" fontWeight="bold">DOMMAGES</text>
        </svg>
      )
    }
  ];

  const handlePhotoCapture = (type) => (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result;
        if (base64) {
          if (type === 'ext') {
            setExtPhotos(prev => [...prev, base64]);
            // Passer automatiquement au guide suivant
            if (currentPhotoGuide < photoGuides.length - 1) {
              setCurrentPhotoGuide(prev => prev + 1);
            }
          } else {
            setIntPhotos(prev => [...prev, base64]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index, type) => {
    if (type === 'ext') {
      setExtPhotos(prev => prev.filter((_, i) => i !== index));
    } else {
      setIntPhotos(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleDocumentCapture = (type) => (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result;
        if (base64) {
          if (type === 'license') {
            setDriverLicensePhotos(prev => [...prev, base64]);
          } else {
            setIdCardPhotos(prev => [...prev, base64]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          setLocation({ lat: 48.8566, lng: 2.3522 });
          alert('Position simulée utilisée');
        }
      );
    } else {
      setLocation({ lat: 48.8566, lng: 2.3522 });
      alert('Position simulée utilisée');
    }
  };

  // Gestion de la signature manuscrite
  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      const canvas = canvasRef.current;
      const signatureData = canvas.toDataURL();
      setSignature(signatureData);
    }
  };

  // Support tactile pour mobile
  const handleTouchStart = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent("mousedown", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvasRef.current.dispatchEvent(mouseEvent);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvasRef.current.dispatchEvent(mouseEvent);
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    const mouseEvent = new MouseEvent("mouseup", {});
    canvasRef.current.dispatchEvent(mouseEvent);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignature('');
  };

  const completePickup = () => {
    if (code === '1234') {
      const exifData = extPhotos.map((_, index) => ({
        timestamp: new Date().toISOString(),
        camera: 'Mobile Camera',
        fileSize: 2000000 + Math.random() * 1000000,
        location: location
      }));
      
      onComplete({
        extPhotos,
        intPhotos,
        extPhotosExif: exifData,
        intPhotosExif: exifData.slice(0, intPhotos.length),
        latitude: location?.lat,
        longitude: location?.lng,
        signature,
        extDamageNotes,
        notes: extDamageNotes,
        driverLicensePhotos,
        idCardPhotos,
        clientAddress: clientInfo.address,
        clientPhone: clientInfo.phone,
        licenseNumber: clientInfo.licenseNumber, 
      });
      
      alert('Check-in terminé avec succès !');
    } else {
      alert('Code incorrect. Utilisez "1234"');
    }
  };

  // Fonction pour sauvegarder l'état dans localStorage
  const saveCheckinState = () => {
    const checkinState = {
      step,
      extPhotos,
      intPhotos,
      location,
      signature,
      driverLicensePhotos,
      idCardPhotos,
      clientInfo
    };
    localStorage.setItem('damaloc-checkin', JSON.stringify(checkinState));
  };

  // Fonction pour restaurer l'état depuis localStorage
  const restoreCheckinState = () => {
    const savedState = localStorage.getItem('damaloc-checkin');
    if (savedState) {
      const {
        step,
        extPhotos,
        intPhotos,
        location,
        signature,
        driverLicensePhotos,
        idCardPhotos,
        clientInfo
      } = JSON.parse(savedState);
      setStep(step);
      setExtPhotos(extPhotos);
      setIntPhotos(intPhotos);
      setLocation(location);
      setSignature(signature);
      setDriverLicensePhotos(driverLicensePhotos);
      setIdCardPhotos(idCardPhotos);
      setClientInfo(clientInfo);
    }
  };

  // Sauvegarde automatique à chaque mise à jour de l'état
  React.useEffect(() => {
    saveCheckinState();
  }, [step, extPhotos, intPhotos, location, signature, driverLicensePhotos, idCardPhotos, clientInfo]);

  // Restauration de l'état au montage du composant
  React.useEffect(() => {
    restoreCheckinState();
  }, []);

  // Ajout du bouton de réinitialisation
  const resetCheckinState = () => {
    localStorage.removeItem('damaloc-checkin');
    setStep(1);
    setExtPhotos([]);
    setIntPhotos([]);
    setLocation(null);
    setSignature('');
    setDriverLicensePhotos([]);
    setIdCardPhotos([]);
    setClientInfo({ address: '', phone: '', licenseNumber: '' });
  };

  React.useEffect(() => {
    if (step === 5 && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
      canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
      canvas.addEventListener('touchend', handleTouchEnd, { passive: false });

      return () => {
        canvas.removeEventListener('touchstart', handleTouchStart);
        canvas.removeEventListener('touchmove', handleTouchMove);
        canvas.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [step]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Check-in véhicule</h2>
          <div className="flex gap-2">
            <button onClick={onBack} className="text-gray-600 hover:text-gray-800 text-sm">
              ← Retour
            </button>
            <button onClick={resetCheckinState} className="text-red-600 hover:text-red-800 text-sm">
              Réinitialiser le check-in
            </button>
            <span className="text-sm text-gray-500">Étape {step} sur 5</span>
          </div>
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Photos extérieures</h3>
            <p className="text-gray-600 mb-4">Prenez au minimum <strong>20 photos</strong> de l'extérieur du véhicule sous tous les angles</p>
          </div>

          {/* Guide photo actuel */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setCurrentPhotoGuide(Math.max(0, currentPhotoGuide - 1))}
                disabled={currentPhotoGuide === 0}
                className="p-2 rounded-full bg-white shadow hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="text-center">
              {photoGuides[currentPhotoGuide] ? (
  <>
    <div className="text-3xl mb-2">{photoGuides[currentPhotoGuide].icon}</div>
    <h4 className="font-bold text-lg text-blue-800">{photoGuides[currentPhotoGuide].title}</h4>
    <p className="text-sm text-blue-600">{photoGuides[currentPhotoGuide].description}</p>
    <p className="text-xs text-gray-600 mt-1">
      Photo {currentPhotoGuide + 1} sur {photoGuides.length}
    </p>
  </>
) : (
  <p className="text-red-600 text-sm text-center">
    Erreur : guide introuvable à l'index {currentPhotoGuide}
  </p>
)}
                <p className="text-xs text-gray-600 mt-1">Photo {currentPhotoGuide + 1} sur {photoGuides.length}</p>
              </div>
              
              <button
                onClick={() => setCurrentPhotoGuide(Math.min(photoGuides.length - 1, currentPhotoGuide + 1))}
                disabled={currentPhotoGuide === photoGuides.length - 1}
                className="p-2 rounded-full bg-white shadow hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            {/* Illustration SVG */}
            <div className="bg-white rounded-lg p-4 h-48 flex items-center justify-center">
              {photoGuides[currentPhotoGuide].svg}
            </div>
          </div>
          
          <div className="space-y-4">
            <input
              type="file"
              accept="image/*"
              multiple
              capture="environment"
              onChange={handlePhotoCapture('ext')}
              className="hidden"
              id="ext-photos"
            />
            <label
              htmlFor="ext-photos"
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all block"
            >
              <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium text-gray-700 mb-2">Prendre la photo</p>
              <p className="text-sm text-gray-500">📱 Appuyez pour ouvrir l'appareil photo</p>
            </label>
            
            {/* Barre de progression */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 font-medium">
                Photos ajoutées : {extPhotos.length} / 20 minimum
              </p>
              <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${Math.min((extPhotos.length / 20) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Grille des photos prises */}
            {extPhotos.length > 0 && (
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-3">Photos prises ({extPhotos.length})</h4>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                  {extPhotos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={photo} 
                        alt={`Photo ${index + 1}`}
                        className="w-full h-20 object-cover rounded border border-gray-300"
                      />
                      <button
                        onClick={() => removePhoto(index, 'ext')}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <span className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                        {index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Champ de notes pour dommages */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <label className="block text-sm font-semibold mb-2 text-yellow-800">
                Déclarer un dommage existant (optionnel)
              </label>
              <textarea
                value={extDamageNotes}
                onChange={(e) => setExtDamageNotes(e.target.value)}
                className="w-full border border-yellow-300 rounded-lg px-4 py-3 h-24 focus:ring-2 focus:ring-yellow-500 outline-none resize-none"
                placeholder="Décrivez tout dommage visible sur le véhicule (rayures, bosses, impacts...). Ce champ n'est pas obligatoire."
              />
              <p className="text-xs text-yellow-600 mt-2">
                ⚠️ Important : Signalez tout défaut pour éviter des litiges lors du retour
              </p>
            </div>
            
            <button
              onClick={() => setStep(2)}
              disabled={extPhotos.length < 20}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
            >
              Continuer ({extPhotos.length < 20 ? `${20 - extPhotos.length} photos manquantes` : 'Prêt'})
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Photos intérieures</h3>
            <p className="text-gray-600 mb-4">Prenez au minimum <strong>10 photos</strong> de l'intérieur du véhicule</p>
          </div>
          
          <div className="space-y-4">
            <input
              type="file"
              accept="image/*"
              multiple
              capture="environment"
              onChange={handlePhotoCapture('int')}
              className="hidden"
              id="interior-photos"
            />
            <label
              htmlFor="interior-photos"
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all block"
            >
              <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium text-gray-700 mb-2">Prendre des photos intérieures</p>
              <p className="text-sm text-gray-500">📱 Appareil photo uniquement</p>
              <p className="text-xs text-blue-600 mt-2">Photographiez : tableau de bord, sièges avant/arrière, coffre, compteur kilométrique, console centrale</p>
            </label>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 font-medium">
                Photos ajoutées : {intPhotos.length} / 10 minimum
              </p>
              <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${Math.min((intPhotos.length / 10) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Grille des photos intérieures */}
            {intPhotos.length > 0 && (
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-3">Photos intérieures ({intPhotos.length})</h4>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                  {intPhotos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={photo} 
                        alt={`Photo int ${index + 1}`}
                        className="w-full h-20 object-cover rounded border border-gray-300"
                      />
                      <button
                        onClick={() => removePhoto(index, 'int')}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <span className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                        {index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <button
              onClick={() => setStep(3)}
              disabled={intPhotos.length < 10}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
            >
              Continuer ({intPhotos.length < 10 ? `${10 - intPhotos.length} photos manquantes` : 'Prêt'})
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Géolocalisation</h3>
            <p className="text-gray-600 mb-4">Confirmez votre position</p>
          </div>
          
          <div className="space-y-4">
            {!location ? (
              <button
                onClick={getLocation}
                className="w-full bg-blue-600 text-white py-6 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-3 text-lg font-semibold transition-all"
              >
                <MapPin className="w-6 h-6" />
                Obtenir ma position GPS
              </button>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <p className="text-green-800 font-semibold text-lg">Position enregistrée !</p>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700">Latitude : {location.lat.toFixed(6)}</p>
                  <p className="text-gray-700">Longitude : {location.lng.toFixed(6)}</p>
                </div>
              </div>
            )}
            
            <button
              onClick={() => setStep(4)}
              disabled={!location}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
            >
              Continuer
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Documents d'identité</h3>
            <p className="text-gray-600 mb-4">Veuillez fournir vos documents officiels</p>
          </div>
          
          <div className="space-y-6">
            {/* Informations client */}
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700">
                Informations complémentaires
              </label>
              <div className="space-y-4">
                <input
                  type="text"
                  value={clientInfo.address}
                  onChange={(e) => setClientInfo(prev => ({...prev, address: e.target.value}))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Adresse complète"
                  required
                />
                <input
                  type="tel"
                  value={clientInfo.phone}
                  onChange={(e) => setClientInfo(prev => ({...prev, phone: e.target.value}))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Numéro de téléphone"
                  required
                />
                <input
                  type="text"
                  value={clientInfo.licenseNumber}
                  onChange={(e) => setClientInfo(prev => ({...prev, licenseNumber: e.target.value}))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Numéro de permis de conduire"
                  required
                />
              </div>
            </div>

            {/* Permis de conduire */}
            <div>
  <label className="block text-sm font-semibold mb-3 text-gray-700">
    Permis de conduire (recto et verso)
  </label>

  <input
    type="file"
    accept="image/*"
    capture="environment"
    onChange={handleDocumentCapture('license')}
    className="hidden"
    id="driver-license"
    multiple
  />

  <label
    htmlFor="driver-license"
    className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all block"
  >
    <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
    <p className="text-gray-700 font-medium">Ajouter les photos du permis</p>
    <p className="text-sm text-gray-500 mt-1">Ajoutez recto et verso (max 2 images)</p>
  </label>

  {driverLicensePhotos.length > 0 && (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {driverLicensePhotos.map((photo, index) => (
        <div key={index} className="relative group">
          <img src={photo} alt={`Permis ${index + 1}`} className="rounded border w-full h-32 object-cover" />
          <button
            onClick={() => setDriverLicensePhotos(prev => prev.filter((_, i) => i !== index))}
            className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full text-xs"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )}
</div>

            {/* Pièce d'identité */}
            <div>
  <label className="block text-sm font-semibold mb-3 text-gray-700">
    Pièce d'identité (recto et verso)
  </label>

  <input
    type="file"
    accept="image/*"
    capture="environment"
    onChange={handleDocumentCapture('id')}
    className="hidden"
    id="id-card"
    multiple
  />

  <label
    htmlFor="id-card"
    className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all block"
  >
    <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
    <p className="text-gray-700 font-medium">Ajouter les photos de la pièce d'identité</p>
    <p className="text-sm text-gray-500 mt-1">Ajoutez recto et verso (max 2 images)</p>
  </label>

  {idCardPhotos.length > 0 && (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {idCardPhotos.map((photo, index) => (
        <div key={index} className="relative group">
          <img src={photo} alt={`ID ${index + 1}`} className="rounded border w-full h-32 object-cover" />
          <button
            onClick={() => setIdCardPhotos(prev => prev.filter((_, i) => i !== index))}
            className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full text-xs"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )}
</div>


            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                <strong>🔒 Sécurité :</strong> Vos documents sont stockés de manière sécurisée et utilisés uniquement pour la validation de votre location.
              </p>
            </div>

            {/* Message d'aide au-dessus du bouton */}
            {(driverLicensePhotos.length < 2 || idCardPhotos.length < 2) && (
              <p className="text-sm text-red-600 text-center mb-3">
                ⚠️ Veuillez ajouter 2 photos pour le permis et 2 pour la pièce d'identité.
              </p>
            )}

            <button
              onClick={() => setStep(5)}
              disabled={driverLicensePhotos.length < 2 || idCardPhotos.length < 2}
              className={`w-full py-4 rounded-lg font-semibold transition-all ${
                driverLicensePhotos.length < 2 || idCardPhotos.length < 2
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {driverLicensePhotos.length < 2 || idCardPhotos.length < 2
                ? `Ajoutez les documents manquants`
                : `Continuer`}
            </button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Signature manuscrite et validation</h3>
            <p className="text-gray-600 mb-4">Signez de votre main et validez avec le code</p>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700">
                Signature manuscrite du client :
              </label>
              <div className="border-2 border-gray-300 rounded-lg p-4 bg-white">
                <canvas
                  ref={canvasRef}
                  width="600"
                  height="200"
                  className="w-full h-48 border border-gray-200 rounded cursor-crosshair touch-none"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  style={{ touchAction: 'none' }}
                />
                <div className="flex justify-between items-center mt-3">
                  <p className="text-sm text-gray-600">
                    Signez avec votre doigt (mobile) ou la souris (ordinateur)
                  </p>
                  <button
                    onClick={clearSignature}
                    className="text-sm text-red-600 hover:text-red-800 font-medium"
                  >
                    Effacer
                  </button>
                </div>
              </div>
              {signature && (
                <div className="mt-3 flex items-center gap-2 text-green-700">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Signature enregistrée</span>
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700">
                Code de validation :
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg font-mono text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Code à 4 chiffres"
                maxLength={4}
              />
              <p className="text-sm text-gray-500 mt-2 text-center">
                Code de démo : <strong>1234</strong>
              </p>
            </div>

            <button
              onClick={completePickup}
              disabled={!signature || !code}
              className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all text-lg"
            >
              ✅ Valider et générer le contrat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ContractView = ({ booking, onBack }) => {
  const [activeTab, setActiveTab] = useState('contract');

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Contrat de location</h2>
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          ← Retour
        </button>
      </div>
      
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('contract')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'contract'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <FileText className="w-4 h-4 inline mr-2" />
          Contrat
        </button>
        <button
          onClick={() => setActiveTab('details')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'details'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Info className="w-4 h-4 inline mr-2" />
          Métadonnées EXIF
        </button>
      </div>

      {activeTab === 'contract' && (
        <div className="space-y-6">
          {/* En-tête du contrat */}
          <div className="bg-gray-100 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">CONTRAT D'AUTOPARTAGE</h2>
            <p className="text-gray-600">DAMALOC - Location de véhicules</p>
          </div>

          {/* Informations société */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-3">La Société</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Nom :</strong> DAMALOC</p>
              <p><strong>SIRET :</strong> 980 615 777 00011</p>
              <p><strong>Adresse :</strong> 9 avenue Doutre Mer, 34300 Agde, France</p>
            </div>
          </div>

          {/* Informations client */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-800 mb-3">Le Client</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Nom :</strong> {booking.clientName}</p>
              <p><strong>Email :</strong> {booking.clientEmail}</p>
              <p><strong>Téléphone :</strong> {booking.clientPhone || 'Non renseigné'}</p>
              <p><strong>Adresse :</strong> {booking.clientAddress || 'Non renseignée'}</p>
              <p><strong>Permis de conduire n° :</strong> {booking.licenseNumber || 'Non renseigné'}</p>
            </div>
          </div>

          {/* Informations location */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-green-800 mb-3">Détails de la location</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Véhicule :</strong> {booking.carModel}</p>
              <p><strong>Immatriculation :</strong> {booking.carPlate || 'Non renseignée'}</p>
              <p><strong>Date de début :</strong> {new Date(booking.pickupDate).toLocaleString('fr-FR')}</p>
              <p><strong>Date de retour :</strong> {booking.returnDate ? new Date(booking.returnDate).toLocaleString('fr-FR') : 'À définir'}</p>
              <p><strong>Lieu de prise et retour :</strong> Agence DAMALOC - 9 avenue Doutre Mer, 34300 Agde</p>
              <p><strong>Tarif :</strong> {booking.price}€</p>
            </div>
          </div>

          {/* État du véhicule */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-3">État du véhicule au départ</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>{booking.extPhotos?.length || 0} photos extérieures prises</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>{booking.intPhotos?.length || 0} photos intérieures prises</span>
              </div>
              {booking.notes && (
                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-yellow-800">
                    <strong>Dommages déclarés :</strong> {booking.notes}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Documents fournis */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="font-semibold text-purple-800 mb-3">Documents fournis</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Permis de conduire : {booking.driverLicense ? 'Fourni' : 'Non fourni'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Pièce d'identité : {booking.idCard ? 'Fournie' : 'Non fournie'}</span>
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Signatures</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium mb-2">Signature de l'Hôte (DAMALOC) :</p>
                <div className="border border-gray-300 rounded p-3 h-24 bg-white">
                  <p className="text-gray-500 text-xs">Signé électroniquement</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Signature du Client :</p>
                <div className="border border-gray-300 rounded p-3 h-24 bg-white">
                  {booking.signature ? (
                    <img src={booking.signature} alt="Signature client" className="h-full" />
                  ) : (
                    <p className="text-gray-500 text-xs">Non signé</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-gray-500 mt-6">
            <p>Document généré le {new Date().toLocaleString('fr-FR')}</p>
            <p>Ce contrat est prêt pour signature électronique et intégration web</p>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 font-semibold transition-all">
              <FileText className="w-5 h-5" />
              Télécharger PDF
            </button>
            <button className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 flex items-center justify-center gap-2 font-semibold transition-all">
              <Mail className="w-5 h-5" />
              Envoyer par email
            </button>
          </div>
        </div>
      )}

      {activeTab === 'details' && (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              <strong>🔒 Sécurité :</strong> Photos prises avec l'appareil photo. 
              Les métadonnées EXIF confirment l'authenticité.
            </p>
          </div>

          {booking.extPhotosExif && booking.extPhotosExif.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Photos extérieures - Métadonnées
              </h3>
              <div className="space-y-4">
                {booking.extPhotosExif.map((exif, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-medium text-gray-800 mb-2">Photo #{index + 1}</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span><strong>Heure :</strong> {new Date(exif.timestamp).toLocaleString('fr-FR')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Camera className="w-4 h-4 text-gray-500" />
                        <span><strong>Appareil :</strong> {exif.camera}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <span><strong>Taille :</strong> {formatFileSize(exif.fileSize)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <span><strong>GPS :</strong> {exif.location ? `${exif.location.lat}, ${exif.location.lng}` : 'Non disponible'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const IncidentForm = ({ onComplete, onBack }) => {
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState([]);
  const [severity, setSeverity] = useState('minor');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim()) {
      alert('Sinistre déclaré avec succès !');
      onComplete();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-red-700">Déclaration de sinistre</h2>
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800 text-sm"
        >
          ← Retour
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-3 text-gray-700">
            Gravité
          </label>
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
          >
            <option value="minor">Mineur (rayure)</option>
            <option value="moderate">Modéré (bosse)</option>
            <option value="major">Majeur (accident)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-3 text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 h-32 focus:ring-2 focus:ring-red-500 outline-none resize-none"
            placeholder="Décrivez l'incident..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-3 text-gray-700">
            Photos
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setPhotos(Array.from(e.target.files || []))}
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />
          <p className="text-sm text-gray-500 mt-2">
            Photos : {photos.length}
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">
            <strong>Important :</strong> Déclaration transmise immédiatement.
          </p>
        </div>

        <button
          type="submit"
          disabled={!description.trim()}
          className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-400 transition-all"
        >
          Déclarer le sinistre
        </button>
      </form>
    </div>
  );
};

const AdminDashboard = ({ reservations, onViewReservation, onAddReservation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = reservation.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.carModel.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || reservation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: reservations.length,
    pending: reservations.filter(r => r.status === 'pending').length,
    completed: reservations.filter(r => r.status === 'completed').length,
    incidents: reservations.filter(r => r.status === 'incident').length
  };

  return (
    <div className="space-y-6 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600 mr-4" />
            <div>
              <div className="text-sm font-medium text-gray-500">Total</div>
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-600 mr-4" />
            <div>
              <div className="text-sm font-medium text-gray-500">En attente</div>
              <div className="text-2xl font-bold text-gray-900">{stats.pending}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600 mr-4" />
            <div>
              <div className="text-sm font-medium text-gray-500">Terminées</div>
              <div className="text-2xl font-bold text-gray-900">{stats.completed}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-600 mr-4" />
            <div>
              <div className="text-sm font-medium text-gray-500">Incidents</div>
              <div className="text-2xl font-bold text-gray-900">{stats.incidents}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            >
              <option value="all">Tous</option>
              <option value="pending">En attente</option>
              <option value="completed">Terminé</option>
              <option value="incident">Incident</option>
            </select>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={onAddReservation}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Nouveau
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Véhicule</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReservations.map((reservation) => (
                <tr key={reservation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{reservation.clientName}</div>
                    <div className="text-sm text-gray-500">{reservation.clientEmail}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{reservation.carModel}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(reservation.pickupDate).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      reservation.status === 'completed' ? 'bg-green-100 text-green-800' :
                      reservation.status === 'incident' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {reservation.status === 'completed' ? 'Terminé' :
                       reservation.status === 'incident' ? 'Incident' : 'En attente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button
                      onClick={() => onViewReservation(reservation.id)}
                      className="text-red-600 hover:text-red-900 flex items-center gap-1 ml-auto"
                    >
                      <Eye className="w-4 h-4" />
                      Voir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AdminDetails = ({ booking, onBack }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Réservation #{booking.id}</h2>
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
        >
          ← Retour
        </button>
      </div>
      
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Client</h3>
            <div className="space-y-3">
              <p><strong>Nom :</strong> {booking.clientName}</p>
              <p><strong>Email :</strong> {booking.clientEmail}</p>
              <p><strong>Téléphone :</strong> {booking.clientPhone}</p>
              <p><strong>Adresse :</strong> {booking.clientAddress || 'Non renseignée'}</p>
              <p><strong>N° permis :</strong> {booking.licenseNumber || 'Non renseigné'}</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-800 mb-4">Véhicule</h3>
            <div className="space-y-3">
              <p><strong>Modèle :</strong> {booking.carModel}</p>
              <p><strong>Plaque :</strong> {booking.carPlate}</p>
              <p><strong>Prix :</strong> {booking.price}€</p>
            </div>
          </div>
        </div>

        {booking.notes && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="font-semibold text-yellow-800 mb-2">Dommages déclarés</h3>
            <p className="text-yellow-700">{booking.notes}</p>
          </div>
        )}

        {booking.extPhotosExif && booking.extPhotosExif.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-green-800 mb-4">Métadonnées EXIF</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <p><strong>Photos extérieures :</strong> {booking.extPhotos?.length || 0}</p>
              <p><strong>Photos intérieures :</strong> {booking.intPhotos?.length || 0}</p>
              <p><strong>Position GPS :</strong> {booking.latitude ? `${booking.latitude.toFixed(4)}, ${booking.longitude.toFixed(4)}` : 'Non disponible'}</p>
              <p><strong>Signature :</strong> {booking.signature ? 'Oui' : 'Non'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AdminAdd = ({ onSave, onBack }) => {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    carModel: '',
    carPlate: '',
    price: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.clientName || !formData.clientEmail || !formData.carModel) {
      alert('Champs obligatoires manquants');
      return;
    }

    onSave({
      ...formData,
      pickupDate: new Date().toISOString(),
      returnDate: new Date(Date.now() + 7*24*60*60*1000).toISOString(),
      price: parseFloat(formData.price) || 0,
      status: 'pending',
      extPhotos: [],
      intPhotos: [],
      extPhotosExif: [],
      intPhotosExif: [],
      signature: '',
      latitude: null,
      longitude: null
    });
    
    alert('Réservation ajoutée !');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Nouvelle réservation</h2>
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
        >
          ← Retour
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
            <input
              type="text"
              value={formData.clientName}
              onChange={(e) => setFormData(prev => ({...prev, clientName: e.target.value}))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              value={formData.clientEmail}
              onChange={(e) => setFormData(prev => ({...prev, clientEmail: e.target.value}))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
            <input
              type="tel"
              value={formData.clientPhone}
              onChange={(e) => setFormData(prev => ({...prev, clientPhone: e.target.value}))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Véhicule *</label>
            <input
              type="text"
              value={formData.carModel}
              onChange={(e) => setFormData(prev => ({...prev, carModel: e.target.value}))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Plaque</label>
            <input
              type="text"
              value={formData.carPlate}
              onChange={(e) => setFormData(prev => ({...prev, carPlate: e.target.value}))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Prix (€)</label>
            <input
              type="number"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({...prev, price: e.target.value}))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({...prev, notes: e.target.value}))}
            rows="3"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none resize-none"
            placeholder="Notes additionnelles..."
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 font-semibold transition-colors"
          >
            Créer la réservation
          </button>
          <button
            type="button"
            onClick={onBack}
            className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 font-semibold transition-colors"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

// Composant pour gérer les véhicules
const VehicleManager = ({ vehicles, onAddVehicle, onEditVehicle, onDeleteVehicle }) => {
  const [newVehicle, setNewVehicle] = useState({ brand: '', model: '', plate: '', photo: '' });
  const [editingVehicle, setEditingVehicle] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewVehicle(prev => ({ ...prev, photo: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddVehicle = () => {
    if (!newVehicle.brand || !newVehicle.model || !newVehicle.plate) {
      alert('Tous les champs sont obligatoires');
      return;
    }
    onAddVehicle({ ...newVehicle, id: Date.now().toString() });
    setNewVehicle({ brand: '', model: '', plate: '', photo: '' });
  };

  const handleEditVehicle = (vehicle) => {
    setEditingVehicle(vehicle);
    setNewVehicle(vehicle);
  };

  const handleUpdateVehicle = () => {
    if (!newVehicle.brand || !newVehicle.model || !newVehicle.plate) {
      alert('Tous les champs sont obligatoires');
      return;
    }
    onEditVehicle(newVehicle);
    setEditingVehicle(null);
    setNewVehicle({ brand: '', model: '', plate: '', photo: '' });
  };

  const handleDeleteVehicle = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      onDeleteVehicle(id);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Gestion des véhicules</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold mb-3">{editingVehicle ? 'Modifier le véhicule' : 'Ajouter un nouveau véhicule'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="brand"
            value={newVehicle.brand}
            onChange={handleInputChange}
            placeholder="Marque"
            className="border border-gray-300 rounded-lg px-3 py-2"
          />
          <input
            type="text"
            name="model"
            value={newVehicle.model}
            onChange={handleInputChange}
            placeholder="Modèle"
            className="border border-gray-300 rounded-lg px-3 py-2"
          />
          <input
            type="text"
            name="plate"
            value={newVehicle.plate}
            onChange={handleInputChange}
            placeholder="Plaque"
            className="border border-gray-300 rounded-lg px-3 py-2"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="border border-gray-300 rounded-lg px-3 py-2"
          />
          {newVehicle.photo && <img src={newVehicle.photo} alt="Aperçu" className="w-32 h-32 object-cover rounded-lg" />}
        </div>
        <div className="mt-4">
          {editingVehicle ? (
            <button
              onClick={handleUpdateVehicle}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Mettre à jour
            </button>
          ) : (
            <button
              onClick={handleAddVehicle}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Ajouter
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold mb-3">Liste des véhicules</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Marque</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Modèle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plaque</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Photo</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vehicles.map(vehicle => (
                <tr key={vehicle.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{vehicle.brand}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{vehicle.model}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{vehicle.plate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {vehicle.photo ? <img src={vehicle.photo} alt="Véhicule" className="w-16 h-16 object-cover rounded-lg" /> : 'Aucune photo'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button
                      onClick={() => handleEditVehicle(vehicle)}
                      className="text-blue-600 hover:text-blue-900 mr-2"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteVehicle(vehicle.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Ajout des fonctions de gestion des véhicules dans le composant principal
const handleAddVehicle = (vehicle) => {
  setVehicles(prev => [...prev, vehicle]);
};

const handleEditVehicle = (updatedVehicle) => {
  setVehicles(prev =>
    prev.map(vehicle => (vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle))
  );
};
const handleDeleteVehicle = (id) => {
  setVehicles(prev => prev.filter(v => v.id !== id));
};

export default App;