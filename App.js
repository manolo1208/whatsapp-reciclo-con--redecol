import React, { useState, useRef } from 'react';
import { MapPin, Camera, Calendar, Package, Phone, User, Truck, Clock, CheckCircle, Eye, BarChart3, History } from 'lucide-react';

const RecyclingApp = () => {
  const [userType, setUserType] = useState('cliente'); // 'cliente' o 'reciclador'
  const [currentView, setCurrentView] = useState('solicitud');
  const [solicitudes, setSolicitudes] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  
  // Estado del formulario de solicitud
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
    tipoResiduo: '',
    cantidad: '',
    unidad: 'kg',
    recoleccion: 'inmediata',
    fechaProgramada: '',
    ubicacion: { lat: 4.6097, lng: -74.0817 }, // Bogotá por defecto
    fotos: []
  });

  // Datos de ejemplo
  const [recicladores] = useState([
    { id: 1, nombre: 'EcoRecolector Norte', distancia: '2.3 km', rating: 4.8, servicios: 156 },
    { id: 2, nombre: 'GreenTeam Centro', distancia: '3.1 km', rating: 4.9, servicios: 203 },
    { id: 3, nombre: 'ReciclaYa Sur', distancia: '4.5 km', rating: 4.7, servicios: 134 }
  ]);

  const tiposResiduos = [
    { id: 'pet', nombre: 'PET (Botellas plásticas)', icon: '🥤', precio: '$800/kg' },
    { id: 'carton', nombre: 'Cartón', icon: '📦', precio: '$400/kg' },
    { id: 'plastico', nombre: 'Plástico general', icon: '🥡', precio: '$600/kg' },
    { id: 'papel', nombre: 'Papel', icon: '📄', precio: '$300/kg' }
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setFormData(prev => ({
          ...prev,
          fotos: [...prev.fotos, e.target.result]
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaSolicitud = {
      id: Date.now(),
      ...formData,
      fecha: new Date().toISOString(),
      estado: 'pendiente'
    };
    setSolicitudes([...solicitudes, nuevaSolicitud]);
    
    // Generar mensaje para WhatsApp
    const mensaje = generarMensajeWhatsApp(nuevaSolicitud);
    const numeroWhatsApp = '573123387813';
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, '_blank');
    
    // Resetear formulario
    setFormData({
      nombre: '',
      telefono: '',
      direccion: '',
      tipoResiduo: '',
      cantidad: '',
      unidad: 'kg',
      recoleccion: 'inmediata',
      fechaProgramada: '',
      ubicacion: { lat: 4.6097, lng: -74.0817 },
      fotos: []
    });
    setSelectedImage(null);
    alert('¡Solicitud enviada! Se abrirá WhatsApp para confirmar.');
  };

  const generarMensajeWhatsApp = (solicitud) => {
    const tipoSeleccionado = tiposResiduos.find(t => t.id === solicitud.tipoResiduo);
    return `🔄 *NUEVA SOLICITUD DE RECOLECCIÓN*

👤 *Cliente:* ${solicitud.nombre}
📱 *Teléfono:* ${solicitud.telefono}
📍 *Dirección:* ${solicitud.direccion}

♻️ *Material:* ${tipoSeleccionado?.nombre || solicitud.tipoResiduo}
⚖️ *Cantidad:* ${solicitud.cantidad} ${solicitud.unidad}
🕐 *Recolección:* ${solicitud.recoleccion === 'inmediata' ? 'Inmediata' : `Programada para ${solicitud.fechaProgramada}`}

📷 *Fotos:* ${solicitud.fotos.length} imagen(es) adjunta(s)

Por favor confirme la disponibilidad para esta recolección.`;
  };

  const SolicitudForm = () => (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-green-700 mb-2">Solicitar Recolección</h2>
        <p className="text-gray-600">Complete el formulario para solicitar nuestro servicio</p>
      </div>

      <div className="space-y-6">
        {/* Datos personales */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <User className="mr-2" size={18} />
            Datos de contacto
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nombre completo"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="tel"
              placeholder="Teléfono"
              value={formData.telefono}
              onChange={(e) => setFormData({...formData, telefono: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <input
            type="text"
            placeholder="Dirección completa"
            value={formData.direccion}
            onChange={(e) => setFormData({...formData, direccion: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 mt-4"
            required
          />
        </div>

        {/* Tipo de residuo */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <Package className="mr-2" size={18} />
            Tipo de material
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {tiposResiduos.map((tipo) => (
              <label key={tipo.id} className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-green-50 cursor-pointer">
                <input
                  type="radio"
                  name="tipoResiduo"
                  value={tipo.id}
                  onChange={(e) => setFormData({...formData, tipoResiduo: e.target.value})}
                  className="mr-3"
                  required
                />
                <span className="text-2xl mr-2">{tipo.icon}</span>
                <div>
                  <div className="font-medium">{tipo.nombre}</div>
                  <div className="text-sm text-gray-500">{tipo.precio}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Cantidad */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-3">Cantidad estimada</h3>
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Cantidad"
              value={formData.cantidad}
              onChange={(e) => setFormData({...formData, cantidad: e.target.value})}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              required
              min="1"
            />
            <select
              value={formData.unidad}
              onChange={(e) => setFormData({...formData, unidad: e.target.value})}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="kg">Kilogramos</option>
              <option value="bolsas">Bolsas</option>
            </select>
          </div>
        </div>

        {/* Fotos */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <Camera className="mr-2" size={18} />
            Fotos del material
          </h3>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 transition-colors"
          >
            <Camera className="mx-auto mb-2" size={32} />
            <p>Toque para agregar foto</p>
          </button>
          {selectedImage && (
            <div className="mt-4">
              <img src={selectedImage} alt="Preview" className="w-full max-w-xs mx-auto rounded-lg" />
            </div>
          )}
        </div>

        {/* Programación */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <Clock className="mr-2" size={18} />
            Programación
          </h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="recoleccion"
                value="inmediata"
                checked={formData.recoleccion === 'inmediata'}
                onChange={(e) => setFormData({...formData, recoleccion: e.target.value})}
                className="mr-3"
              />
              Recolección inmediata (hoy)
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="recoleccion"
                value="programada"
                checked={formData.recoleccion === 'programada'}
                onChange={(e) => setFormData({...formData, recoleccion: e.target.value})}
                className="mr-3"
              />
              Programar fecha
            </label>
            {formData.recoleccion === 'programada' && (
              <input
                type="date"
                value={formData.fechaProgramada}
                onChange={(e) => setFormData({...formData, fechaProgramada: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 mt-2"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            )}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center cursor-pointer"
        >
          <Phone className="mr-2" size={20} />
          Enviar solicitud por WhatsApp
        </button>
      </div>
    </div>
  );

  const RecicladorDashboard = () => (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-500 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Solicitudes Disponibles</p>
              <p className="text-3xl font-bold">{solicitudes.filter(s => s.estado === 'pendiente').length}</p>
            </div>
            <Truck size={48} />
          </div>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Servicios Completados</p>
              <p className="text-3xl font-bold">47</p>
            </div>
            <CheckCircle size={48} />
          </div>
        </div>
        <div className="bg-purple-500 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Rating Promedio</p>
              <p className="text-3xl font-bold">4.8</p>
            </div>
            <BarChart3 size={48} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Solicitudes Disponibles</h3>
          <div className="space-y-4">
            {solicitudes.filter(s => s.estado === 'pendiente').map((solicitud) => (
              <div key={solicitud.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{solicitud.nombre}</h4>
                  <span className="text-sm text-gray-500">2.3 km</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{solicitud.direccion}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    {solicitud.tipoResiduo} - {solicitud.cantidad} {solicitud.unidad}
                  </span>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600">
                    Aceptar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Recicladores Cercanos</h3>
          <div className="space-y-4">
            {recicladores.map((reciclador) => (
              <div key={reciclador.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{reciclador.nombre}</h4>
                    <p className="text-sm text-gray-600">Distancia: {reciclador.distancia}</p>
                    <p className="text-sm text-gray-600">Rating: {reciclador.rating}⭐</p>
                  </div>
                  <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                    {reciclador.servicios} servicios
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const HistorialView = () => (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <History className="mr-2" />
        Historial de Solicitudes
      </h3>
      <div className="space-y-4">
        {solicitudes.map((solicitud) => (
          <div key={solicitud.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold">{solicitud.nombre}</h4>
                <p className="text-sm text-gray-600">{new Date(solicitud.fecha).toLocaleDateString()}</p>
              </div>
              <span className={`text-sm px-2 py-1 rounded ${
                solicitud.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                solicitud.estado === 'completado' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {solicitud.estado}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{solicitud.direccion}</p>
            <p className="text-sm">{solicitud.tipoResiduo} - {solicitud.cantidad} {solicitud.unidad}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-green-600 text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">♻️ EcoRecolector</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setUserType('cliente')}
              className={`px-4 py-2 rounded ${userType === 'cliente' ? 'bg-green-800' : 'bg-green-500'}`}
            >
              Cliente
            </button>
            <button
              onClick={() => setUserType('reciclador')}
              className={`px-4 py-2 rounded ${userType === 'reciclador' ? 'bg-green-800' : 'bg-green-500'}`}
            >
              Reciclador
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm p-4">
        <div className="max-w-6xl mx-auto flex space-x-6">
          {userType === 'cliente' ? (
            <>
              <button
                onClick={() => setCurrentView('solicitud')}
                className={`flex items-center px-4 py-2 rounded ${currentView === 'solicitud' ? 'bg-green-100 text-green-700' : 'text-gray-600'}`}
              >
                <Package className="mr-2" size={18} />
                Nueva Solicitud
              </button>
              <button
                onClick={() => setCurrentView('historial')}
                className={`flex items-center px-4 py-2 rounded ${currentView === 'historial' ? 'bg-green-100 text-green-700' : 'text-gray-600'}`}
              >
                <History className="mr-2" size={18} />
                Historial
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`flex items-center px-4 py-2 rounded ${currentView === 'dashboard' ? 'bg-green-100 text-green-700' : 'text-gray-600'}`}
              >
                <BarChart3 className="mr-2" size={18} />
                Dashboard
              </button>
              <button
                onClick={() => setCurrentView('solicitudes')}
                className={`flex items-center px-4 py-2 rounded ${currentView === 'solicitudes' ? 'bg-green-100 text-green-700' : 'text-gray-600'}`}
              >
                <Eye className="mr-2" size={18} />
                Ver Solicitudes
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        {userType === 'cliente' && currentView === 'solicitud' && <SolicitudForm />}
        {userType === 'cliente' && currentView === 'historial' && <HistorialView />}
        {userType === 'reciclador' && <RecicladorDashboard />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>📱 WhatsApp: +57 312 338 7813 | 🌱 Servicios de Aseo Complementario</p>
        <p className="text-sm text-gray-400 mt-2">Contribuyendo al cuidado del medio ambiente</p>
      </footer>
    </div>
  );
};

export default RecyclingApp;
