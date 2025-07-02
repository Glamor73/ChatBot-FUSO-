import { useState } from 'react';
import ChatBot from './components/ChatBot/ChatBot';
import WidgetDemo from './components/ChatBot/WidgetDemo';
import EmbedScript from './components/ChatBot/EmbedScript';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState<'normal' | 'widget' | 'embed'>('normal');

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-indigo-100">
      {/* Navegación */}
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/robot-logo.svg" 
                alt="ChatBot FUSO" 
                className="w-10 h-10"
              />
              <h1 className="text-2xl font-bold text-gray-800">ChatBot FUSO</h1>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentView('normal')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'normal' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Chat Normal
              </button>
              <button
                onClick={() => setCurrentView('widget')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'widget' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Widget Demo
              </button>
              <button
                onClick={() => setCurrentView('embed')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'embed' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Código Embed
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-8">
        {currentView === 'normal' && (
          <>
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <img 
                  src="/robot-logo.svg" 
                  alt="ChatBot FUSO" 
                  className="w-16 h-16"
                />
                <h2 className="text-4xl font-bold text-gray-800">
                  ChatBot FUSO - Versión Normal
                </h2>
              </div>
              <p className="text-gray-600">
                Asistente virtual inteligente para tus proyectos
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <ChatBot />
            </div>
          </>
        )}

        {currentView === 'widget' && <WidgetDemo />}

        {currentView === 'embed' && (
          <div className="max-w-6xl mx-auto">
            <EmbedScript />
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="grid md:grid-cols-2 gap-4 text-left max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Características del Widget
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Botón flotante personalizable</li>
                <li>✅ Contador de mensajes no leídos</li>
                <li>✅ Animaciones suaves</li>
                <li>✅ Responsive design</li>
                <li>✅ Fácil integración</li>
                <li>✅ Múltiples posiciones</li>
                <li>✅ Colores personalizables</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Casos de Uso
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>🌐 Sitios web corporativos</li>
                <li>🛒 Tiendas online</li>
                <li>📚 Plataformas educativas</li>
                <li>🏥 Servicios de salud</li>
                <li>💼 Aplicaciones SaaS</li>
                <li>📱 Landing pages</li>
                <li>🎯 Campañas de marketing</li>
              </ul>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-gray-500 text-sm">
              © 2023 FUSO. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;