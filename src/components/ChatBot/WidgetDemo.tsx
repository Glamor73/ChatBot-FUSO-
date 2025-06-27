import React, { useState } from 'react';
import FloatingChatBot from './FloatingChatBot';

const WidgetDemo: React.FC = () => {
  const [config, setConfig] = useState({
    position: 'bottom-right' as const,
    size: 'medium' as const,
    primaryColor: '#3b82f6',
    secondaryColor: '#ef4444',
    title: 'ChatBot FUSO'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            ChatBot Widget Demo
          </h1>
          <p className="text-gray-600">
            Prueba el widget flotante y personaliza su configuración
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Panel de configuración */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Configuración del Widget
            </h2>
            
            <div className="space-y-6">
              {/* Posición */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Posición
                </label>
                <select
                  value={config.position}
                  onChange={(e) => setConfig({...config, position: e.target.value as any})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="bottom-right">Abajo Derecha</option>
                  <option value="bottom-left">Abajo Izquierda</option>
                  <option value="top-right">Arriba Derecha</option>
                  <option value="top-left">Arriba Izquierda</option>
                </select>
              </div>

              {/* Tamaño */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tamaño
                </label>
                <select
                  value={config.size}
                  onChange={(e) => setConfig({...config, size: e.target.value as any})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="small">Pequeño</option>
                  <option value="medium">Mediano</option>
                  <option value="large">Grande</option>
                </select>
              </div>

              {/* Color primario */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color Primario
                </label>
                <div className="flex space-x-2">
                  <input
                    type="color"
                    value={config.primaryColor}
                    onChange={(e) => setConfig({...config, primaryColor: e.target.value})}
                    className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={config.primaryColor}
                    onChange={(e) => setConfig({...config, primaryColor: e.target.value})}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Color secundario */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color Secundario
                </label>
                <div className="flex space-x-2">
                  <input
                    type="color"
                    value={config.secondaryColor}
                    onChange={(e) => setConfig({...config, secondaryColor: e.target.value})}
                    className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={config.secondaryColor}
                    onChange={(e) => setConfig({...config, secondaryColor: e.target.value})}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Título */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título del ChatBot
                </label>
                <input
                  type="text"
                  value={config.title}
                  onChange={(e) => setConfig({...config, title: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Vista previa */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Vista Previa
            </h2>
            
            <div className="relative bg-gray-100 rounded-lg h-96 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 opacity-50"></div>
              <div className="absolute inset-4 bg-white rounded-lg shadow-inner flex items-center justify-center">
                <p className="text-gray-500 text-center">
                  Esta es una simulación de tu página web.<br/>
                  El widget aparecerá en la posición seleccionada.
                </p>
              </div>
              
              {/* Simulación del widget en diferentes posiciones */}
              <div className={`absolute ${
                config.position === 'bottom-right' ? 'bottom-4 right-4' :
                config.position === 'bottom-left' ? 'bottom-4 left-4' :
                config.position === 'top-right' ? 'top-4 right-4' :
                'top-4 left-4'
              }`}>
                <div 
                  className={`${
                    config.size === 'small' ? 'w-12 h-12' :
                    config.size === 'medium' ? 'w-14 h-14' :
                    'w-16 h-16'
                  } rounded-full shadow-lg flex items-center justify-center text-white`}
                  style={{
                    background: `linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor})`
                  }}
                >
                  💬
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Configuración Actual:</h3>
              <pre className="text-sm text-blue-700 overflow-x-auto">
{`{
  position: "${config.position}",
  size: "${config.size}",
  primaryColor: "${config.primaryColor}",
  secondaryColor: "${config.secondaryColor}",
  title: "${config.title}"
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Widget flotante real */}
        <FloatingChatBot
          position={config.position}
          size={config.size}
          primaryColor={config.primaryColor}
          secondaryColor={config.secondaryColor}
          title={config.title}
        />
      </div>
    </div>
  );
};

export default WidgetDemo;