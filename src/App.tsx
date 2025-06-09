import React from 'react';
import ChatBot from './components/ChatBot/ChatBot';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            ChatBot FUSO
          </h1>
          <p className="text-gray-600">
            Asistente virtual inteligente para tus proyectos
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <ChatBot />
        </div>
        
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Cómo usar este ChatBot
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div>
                <h3 className="font-semibold text-blue-600 mb-2">✨ Características</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Interfaz moderna y responsive</li>
                  <li>• Animaciones suaves</li>
                  <li>• Historial de conversación</li>
                  <li>• Respuestas inteligentes</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-green-600 mb-2">🚀 Integración</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Componente reutilizable</li>
                  <li>• Fácil personalización</li>
                  <li>• Compatible con React</li>
                  <li>• Exportable como módulo</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;