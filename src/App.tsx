import React from 'react';
import ChatBot from './components/ChatBot/ChatBot';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-indigo-100">
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
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div>
              </div>
              <div>
                <p className="text-gray-500 text-sm">
                  © 2023 FUSO. Todos los derechos reservados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
}

export default App;