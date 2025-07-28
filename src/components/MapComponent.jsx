import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useInView } from 'react-intersection-observer';
import { MapPin, Navigation, Globe, Mail, Phone } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom marker icon
const customIcon = new L.divIcon({
  html: `
    <div style="
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      width: 30px;
      height: 30px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        transform: rotate(45deg);
        color: white;
        font-size: 14px;
        font-weight: bold;
      ">📍</div>
    </div>
  `,
  className: 'custom-marker',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const MapComponent = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedMode, setSelectedMode] = useState('location');

  // Cairo, Egypt coordinates
  const position = [30.0444, 31.2357];

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const mapModes = [
    {
      id: 'location',
      name: 'Location',
      icon: MapPin,
      description: 'My current location'
    },
    {
      id: 'satellite',
      name: 'Satellite',
      icon: Globe,
      description: 'Satellite view'
    },
    {
      id: 'terrain',
      name: 'Terrain',
      icon: Navigation,
      description: 'Terrain view'
    }
  ];

  const getTileLayerUrl = () => {
    switch (selectedMode) {
      case 'satellite':
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      case 'terrain':
        return 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
      default:
        return 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">Find Me Here</h3>
            <p className="text-gray-400 text-sm">Cairo, Egypt</p>
          </div>
        </div>

        {/* Map Mode Selector */}
        <div className="flex bg-slate-800/50 rounded-lg p-1">
          {mapModes.map((mode) => (
            <motion.button
              key={mode.id}
              onClick={() => setSelectedMode(mode.id)}
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-xs font-medium transition-all duration-300 ${
                selectedMode === mode.id
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Switch to ${mode.description}`}
            >
              <mode.icon className="w-3 h-3" aria-hidden="true" />
              <span className="hidden sm:inline">{mode.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-80 rounded-xl overflow-hidden">
        {!isLoaded && (
          <div className="absolute inset-0 bg-slate-800 rounded-xl flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="text-gray-400 text-sm">Loading map...</span>
            </div>
          </div>
        )}
        
        <motion.div
          className="h-full w-full rounded-xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.95 }}
          transition={{ duration: 0.5 }}
        >
          <MapContainer
            center={position}
            zoom={12}
            style={{ height: '100%', width: '100%' }}
            className="rounded-xl"
            zoomControl={false}
          >
            <TileLayer
              url={getTileLayerUrl()}
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position} icon={customIcon}>
              <Popup className="custom-popup">
                <div className="p-2">
                  <h4 className="font-semibold text-gray-800 mb-2">Sameh Saleh El-khayat</h4>
                  <p className="text-sm text-gray-600 mb-3">Frontend Developer</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-blue-500" />
                      <span>sameh@example.com</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-green-500" />
                      <span>+20 (10) 123-4567</span>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </motion.div>

        {/* Custom Map Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <motion.button
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-700 hover:bg-white transition-colors shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              // Zoom in functionality would go here
            }}
            aria-label="Zoom in"
          >
            <span className="text-lg font-bold">+</span>
          </motion.button>
          <motion.button
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-700 hover:bg-white transition-colors shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              // Zoom out functionality would go here
            }}
            aria-label="Zoom out"
          >
            <span className="text-lg font-bold">−</span>
          </motion.button>
        </div>
      </div>

      {/* Location Info */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          className="text-center p-3 bg-slate-800/30 rounded-lg"
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-blue-400 font-semibold text-sm">Timezone</div>
          <div className="text-white text-xs">EET (UTC+2)</div>
        </motion.div>
        <motion.div
          className="text-center p-3 bg-slate-800/30 rounded-lg"
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-green-400 font-semibold text-sm">Availability</div>
          <div className="text-white text-xs">Sun-Thu 9AM-6PM</div>
        </motion.div>
        <motion.div
          className="text-center p-3 bg-slate-800/30 rounded-lg"
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-purple-400 font-semibold text-sm">Remote Work</div>
          <div className="text-white text-xs">Worldwide</div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MapComponent; 