import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cloud, Sun, CloudRain, CloudSnow, CloudLightning, 
  Wind, Droplets, Eye, Thermometer, MapPin, RefreshCw,
  Sunrise, Sunset, Gauge, Navigation
} from 'lucide-react';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Mock weather data (in real app, you'd use a weather API)
  const mockWeatherData = {
    location: {
      name: 'Cairo',
      country: 'Egypt',
      lat: 30.0444,
      lon: 31.2357
    },
    current: {
      temperature: 28,
      condition: 'sunny',
      description: 'Sunny',
      humidity: 45,
      windSpeed: 12,
      windDirection: 'NE',
      pressure: 1013,
      visibility: 10,
      uvIndex: 8,
      feelsLike: 32
    },
    forecast: [
      { day: 'Today', high: 30, low: 18, condition: 'sunny' },
      { day: 'Tomorrow', high: 32, low: 20, condition: 'partly-cloudy' },
      { day: 'Thursday', high: 29, low: 17, condition: 'cloudy' },
      { day: 'Friday', high: 27, low: 16, condition: 'rainy' }
    ],
    sun: {
      sunrise: '06:30',
      sunset: '17:45'
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add some randomness to make it feel real
      const variation = (Math.random() - 0.5) * 4;
      const weatherData = {
        ...mockWeatherData,
        current: {
          ...mockWeatherData.current,
          temperature: Math.round(mockWeatherData.current.temperature + variation),
          humidity: Math.max(20, Math.min(80, mockWeatherData.current.humidity + Math.round(variation * 2))),
          windSpeed: Math.max(0, Math.round(mockWeatherData.current.windSpeed + variation))
        }
      };
      
      setWeather(weatherData);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition) => {
    const iconProps = { className: "w-8 h-8" };
    
    switch (condition) {
      case 'sunny':
        return <Sun {...iconProps} className="w-8 h-8 text-yellow-400" />;
      case 'partly-cloudy':
        return <Cloud {...iconProps} className="w-8 h-8 text-gray-400" />;
      case 'cloudy':
        return <Cloud {...iconProps} className="w-8 h-8 text-gray-500" />;
      case 'rainy':
        return <CloudRain {...iconProps} className="w-8 h-8 text-blue-400" />;
      case 'snowy':
        return <CloudSnow {...iconProps} className="w-8 h-8 text-blue-200" />;
      case 'stormy':
        return <CloudLightning {...iconProps} className="w-8 h-8 text-purple-400" />;
      default:
        return <Sun {...iconProps} className="w-8 h-8 text-yellow-400" />;
    }
  };

  const getWeatherAnimation = (condition) => {
    switch (condition) {
      case 'sunny':
        return 'animate-pulse';
      case 'rainy':
        return 'animate-bounce';
      default:
        return '';
    }
  };

  const formatTime = (time) => {
    return new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300"
      >
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="text-gray-400 text-sm">Loading weather...</span>
          </div>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300"
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <motion.button
              onClick={fetchWeather}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Retry
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">Current Weather</h3>
            <p className="text-gray-300 text-sm">{weather.location.name}, {weather.location.country}</p>
          </div>
        </div>

        <motion.button
          onClick={fetchWeather}
          className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50"
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          title="Refresh weather"
        >
          <RefreshCw className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Main Weather Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Current Conditions */}
        <div className="text-center">
          <motion.div 
            className={`mb-4 ${getWeatherAnimation(weather.current.condition)}`}
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: weather.current.condition === 'sunny' ? [0, 360] : 0 
            }}
            transition={{ 
              duration: weather.current.condition === 'sunny' ? 10 : 2, 
              repeat: Infinity 
            }}
          >
            {getWeatherIcon(weather.current.condition)}
          </motion.div>
          <div className="text-4xl font-bold text-white mb-2">
            {weather.current.temperature}°C
          </div>
          <div className="text-gray-300 text-lg mb-2">
            {weather.current.description}
          </div>
          <div className="text-gray-400 text-sm">
            Feels like {weather.current.feelsLike}°C
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Droplets className="w-4 h-4 text-blue-400" />
              <span className="text-gray-300 text-sm">Humidity</span>
            </div>
            <div className="text-white font-semibold">{weather.current.humidity}%</div>
          </div>

          <div className="bg-slate-800/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Wind className="w-4 h-4 text-cyan-400" />
              <span className="text-gray-300 text-sm">Wind</span>
            </div>
            <div className="text-white font-semibold">{weather.current.windSpeed} km/h</div>
          </div>

          <div className="bg-slate-800/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Gauge className="w-4 h-4 text-green-400" />
              <span className="text-gray-300 text-sm">Pressure</span>
            </div>
            <div className="text-white font-semibold">{weather.current.pressure} hPa</div>
          </div>

          <div className="bg-slate-800/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Eye className="w-4 h-4 text-purple-400" />
              <span className="text-gray-300 text-sm">Visibility</span>
            </div>
            <div className="text-white font-semibold">{weather.current.visibility} km</div>
          </div>
        </div>
      </div>

      {/* Sun Times */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-lg p-3 border border-orange-500/30">
          <div className="flex items-center gap-2 mb-1">
            <Sunrise className="w-4 h-4 text-orange-400" />
            <span className="text-gray-300 text-sm">Sunrise</span>
          </div>
          <div className="text-white font-semibold">{weather.sun.sunrise}</div>
        </div>

        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-3 border border-purple-500/30">
          <div className="flex items-center gap-2 mb-1">
            <Sunset className="w-4 h-4 text-purple-400" />
            <span className="text-gray-300 text-sm">Sunset</span>
          </div>
          <div className="text-white font-semibold">{weather.sun.sunset}</div>
        </div>
      </div>

      {/* 4-Day Forecast */}
      <div>
        <h4 className="text-white font-semibold mb-3">4-Day Forecast</h4>
        <div className="grid grid-cols-4 gap-2">
          {weather.forecast.map((day, index) => (
            <motion.div
              key={index}
              className="bg-slate-800/30 rounded-lg p-3 text-center hover:bg-slate-800/50 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-gray-300 text-xs mb-2">{day.day}</div>
              <div className="mb-2 flex justify-center">
                {React.cloneElement(getWeatherIcon(day.condition), { 
                  className: "w-5 h-5" 
                })}
              </div>
              <div className="text-white text-sm font-semibold">{day.high}°</div>
              <div className="text-gray-400 text-xs">{day.low}°</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Last Updated */}
      {lastUpdated && (
        <div className="mt-4 text-center text-gray-500 text-xs">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      )}
    </motion.div>
  );
};

export default WeatherWidget; 