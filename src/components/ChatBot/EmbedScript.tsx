import React from 'react';

const EmbedScript: React.FC = () => {
  const embedCode = `
<!-- ChatBot FUSO Widget -->
<div id="chatbot-fuso-widget"></div>
<script>
  (function() {
    // Configuración del widget
    window.ChatBotFUSOConfig = {
      title: "ChatBot FUSO",
      placeholder: "Escribe tu mensaje aquí...",
      position: "bottom-right", // bottom-right, bottom-left, top-right, top-left
      size: "medium", // small, medium, large
      primaryColor: "#3b82f6",
      secondaryColor: "#ef4444",
      theme: "light"
    };

    // Cargar el widget
    var script = document.createElement('script');
    script.src = 'https://tu-dominio.com/chatbot-fuso-widget.js';
    script.async = true;
    document.head.appendChild(script);

    // Cargar estilos
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://tu-dominio.com/chatbot-fuso-widget.css';
    document.head.appendChild(link);
  })();
</script>
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    alert('¡Código copiado al portapapeles!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Código de Integración - ChatBot Widget
      </h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">
          Instrucciones de Instalación:
        </h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-600">
          <li>Copia el código de abajo</li>
          <li>Pégalo antes del cierre de la etiqueta <code>&lt;/body&gt;</code> en tu página web</li>
          <li>Personaliza la configuración según tus necesidades</li>
          <li>¡El widget aparecerá automáticamente en tu sitio!</li>
        </ol>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-700">Código de Integración:</h3>
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Copiar Código
          </button>
        </div>
        
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
          <code>{embedCode}</code>
        </pre>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Opciones de Configuración:</h3>
          <div className="space-y-2 text-sm">
            <div><strong>title:</strong> Título del chatbot</div>
            <div><strong>placeholder:</strong> Texto del input</div>
            <div><strong>position:</strong> Posición en pantalla</div>
            <div><strong>size:</strong> Tamaño del widget</div>
            <div><strong>primaryColor:</strong> Color principal</div>
            <div><strong>secondaryColor:</strong> Color secundario</div>
            <div><strong>theme:</strong> Tema visual</div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Posiciones Disponibles:</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="p-2 bg-gray-100 rounded">bottom-right</div>
            <div className="p-2 bg-gray-100 rounded">bottom-left</div>
            <div className="p-2 bg-gray-100 rounded">top-right</div>
            <div className="p-2 bg-gray-100 rounded">top-left</div>
          </div>
          
          <h3 className="text-lg font-semibold mb-3 mt-4 text-gray-700">Tamaños:</h3>
          <div className="flex space-x-2 text-sm">
            <div className="p-2 bg-gray-100 rounded">small</div>
            <div className="p-2 bg-gray-100 rounded">medium</div>
            <div className="p-2 bg-gray-100 rounded">large</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmbedScript;