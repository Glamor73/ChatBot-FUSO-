# 📚 Explicación Código por Código - ChatBot FUSO

## 🏗️ **1. package.json** - Configuración del Proyecto

```json
{
  "name": "chatbot-fuso",           // Nombre del proyecto
  "private": true,                  // No se publicará en npm
  "version": "0.0.0",              // Versión inicial
  "type": "module",                // Usa módulos ES6
  "scripts": {
    "dev": "vite",                 // Comando para desarrollo
    "build": "tsc && vite build",  // Compilar TypeScript y construir
    "preview": "vite preview"      // Vista previa de la build
  },
  "dependencies": {
    "react": "^18.2.0",           // Librería principal de React
    "react-dom": "^18.2.0",       // Para renderizar en el DOM
    "lucide-react": "^0.263.1",   // Iconos modernos
    "framer-motion": "^10.16.4"   // Animaciones suaves
  },
  "devDependencies": {
    "@types/react": "^18.2.15",   // Tipos de TypeScript para React
    "@vitejs/plugin-react": "^4.0.3", // Plugin de Vite para React
    "tailwindcss": "^3.3.3",      // Framework CSS
    "typescript": "^5.0.2",       // Compilador TypeScript
    "vite": "^4.4.5"             // Bundler rápido
  }
}
```

**¿Qué hace?** Define las dependencias, scripts y configuración básica del proyecto.

---

## 🎯 **2. vite.config.ts** - Configuración del Bundler

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],              // Habilita soporte para React
  build: {
    lib: {                         // Configuración para construir como librería
      entry: 'src/components/ChatBot/index.ts',  // Punto de entrada
      name: 'ChatBotFUSO',         // Nombre global de la librería
      fileName: (format) => `chatbot-fuso.${format}.js`  // Nombre del archivo
    },
    rollupOptions: {
      external: ['react', 'react-dom'],  // No incluir React en el bundle
      output: {
        globals: {                 // Variables globales para UMD
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
```

**¿Qué hace?** Configura Vite para que pueda construir el proyecto tanto como aplicación como librería reutilizable.

---

## 🎨 **3. tailwind.config.js** - Configuración de Estilos

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // Archivos donde buscar clases CSS
  ],
  theme: {
    extend: {
      colors: {                    // Colores personalizados del sistema de diseño
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        // ... más colores
      },
      animation: {                 // Animaciones personalizadas
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {                 // Definición de las animaciones
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        }
      }
    }
  }
}
```

**¿Qué hace?** Define los estilos, colores y animaciones que usará el chatbot.

---

## 🏠 **4. src/main.tsx** - Punto de Entrada

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>    {/* Modo estricto para detectar problemas */}
    <App />             {/* Componente principal */}
  </React.StrictMode>,
)
```

**¿Qué hace?** Inicializa la aplicación React y la monta en el DOM.

---

## 📱 **5. src/App.tsx** - Aplicación Principal

```typescript
import React from 'react';
import ChatBot from './components/ChatBot/ChatBot';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Contenedor principal con gradiente de fondo */}
      
      <div className="container mx-auto px-4 py-8">
        {/* Título de la aplicación */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            ChatBot FUSO
          </h1>
          <p className="text-gray-600">
            Asistente virtual inteligente para tus proyectos
          </p>
        </div>
        
        {/* El componente ChatBot */}
        <div className="max-w-4xl mx-auto">
          <ChatBot />
        </div>
        
        {/* Información adicional */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Cómo usar este ChatBot
            </h2>
            {/* Grid con características */}
            <div className="grid md:grid-cols-2 gap-4 text-left">
              {/* Características y funcionalidades */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

**¿Qué hace?** Es la página principal que muestra el chatbot y información sobre cómo usarlo.

---

## 🧠 **6. src/components/ChatBot/types.ts** - Definiciones de Tipos

```typescript
export interface Message {
  id: string;                      // Identificador único del mensaje
  text: string;                    // Contenido del mensaje
  sender: 'user' | 'bot';         // Quién envió el mensaje
  timestamp: Date;                 // Cuándo se envió
}

export interface ChatBotProps {
  title?: string;                  // Título personalizable
  placeholder?: string;            // Texto del input
  className?: string;              // Clases CSS adicionales
  theme?: 'light' | 'dark';       // Tema visual
  onMessageSent?: (message: string) => void;  // Callback opcional
  customBotLogic?: (message: string) => Promise<string>;  // Lógica personalizada
}

export interface BotResponse {
  text: string;                    // Respuesta del bot
  delay?: number;                  // Delay opcional
}
```

**¿Qué hace?** Define la estructura de datos que usa el chatbot (tipos de TypeScript).

---

## 🤖 **7. src/components/ChatBot/botLogic.ts** - Inteligencia del Bot

```typescript
// Base de conocimiento organizada por categorías
const responses = {
  greetings: [
    "¡Hola! ¿Cómo puedo ayudarte hoy?",
    "¡Saludos! Estoy aquí para asistirte.",
  ],
  help: [
    "Puedo ayudarte con información general...",
  ],
  // ... más categorías
};

// Patrones de reconocimiento usando expresiones regulares
const patterns = {
  greetings: /\b(hola|hi|hello|saludos)\b/i,  // Detecta saludos
  help: /\b(ayuda|help|asistencia)\b/i,       // Detecta pedidos de ayuda
  // ... más patrones
};

// Función principal que procesa los mensajes
export const getBotResponse = async (userMessage: string): Promise<string> => {
  const message = userMessage.toLowerCase().trim();
  
  // Busca patrones en el mensaje
  for (const [category, pattern] of Object.entries(patterns)) {
    if (pattern.test(message)) {
      const categoryResponses = responses[category];
      return getRandomResponse(categoryResponses);  // Respuesta aleatoria
    }
  }
  
  // Respuestas específicas por palabras clave
  if (message.includes('tiempo')) {
    return `La hora actual es ${new Date().toLocaleTimeString()}`;
  }
  
  // Respuesta por defecto si no encuentra patrón
  return getRandomResponse(responses.default);
};

// Función auxiliar para respuestas aleatorias
const getRandomResponse = (responseArray: string[]): string => {
  return responseArray[Math.floor(Math.random() * responseArray.length)];
};
```

**¿Qué hace?** Es el "cerebro" del chatbot. Analiza los mensajes del usuario y decide qué responder.

---

## 💬 **8. src/components/ChatBot/MessageBubble.tsx** - Burbujas de Mensaje

```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isBot = message.sender === 'bot';  // Determina si es mensaje del bot
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}      // Animación de entrada
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}  // Alineación
    >
      <div className={`flex ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        
        {/* Avatar del usuario/bot */}
        <div className={`w-8 h-8 rounded-full ${
          isBot 
            ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
            : 'bg-gray-300'
        }`}>
          {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
        </div>
        
        {/* Burbuja del mensaje */}
        <div className={`px-4 py-2 rounded-2xl ${
          isBot 
            ? 'bg-white text-gray-800 shadow-md' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
        }`}>
          <p className="text-sm">{message.text}</p>
          <p className="text-xs mt-1">
            {message.timestamp.toLocaleTimeString()}  {/* Hora del mensaje */}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
```

**¿Qué hace?** Renderiza cada mensaje individual con su estilo, avatar y animación.

---

## ⌨️ **9. src/components/ChatBot/TypingIndicator.tsx** - Indicador de Escritura

```typescript
import React from 'react';
import { motion } from 'framer-motion';

const TypingIndicator: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start"
    >
      <div className="bg-white shadow-md px-4 py-3 rounded-2xl">
        <div className="flex space-x-1">
          {/* Tres puntos animados */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}           // Animación de escala
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}  // Repetición infinita
            className="w-2 h-2 bg-gray-400 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}  // Delay escalonado
            className="w-2 h-2 bg-gray-400 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            className="w-2 h-2 bg-gray-400 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
};
```

**¿Qué hace?** Muestra una animación de "escribiendo..." cuando el bot está procesando una respuesta.

---

## 🎛️ **10. src/components/ChatBot/ChatBot.tsx** - Componente Principal

```typescript
const ChatBot: React.FC<ChatBotProps> = ({
  title = "ChatBot FUSO",           // Props con valores por defecto
  placeholder = "Escribe tu mensaje aquí...",
  className = "",
  theme = "light"
}) => {
  // Estados del componente
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy tu asistente virtual FUSO...',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Referencias para el DOM
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Función para scroll automático
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Efecto para hacer scroll cuando hay nuevos mensajes
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Función principal para enviar mensajes
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;  // No enviar si está vacío

    // Crear mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);  // Agregar a la lista
    setInputValue('');                            // Limpiar input
    setIsTyping(true);                           // Mostrar indicador

    // Simular delay del bot y obtener respuesta
    setTimeout(async () => {
      const botResponse = await getBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);  // Delay aleatorio realista
  };

  // Manejar Enter para enviar
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Función para limpiar el chat
  const clearChat = () => {
    setMessages([/* mensaje inicial */]);
  };

  // Función para exportar conversación
  const exportChat = () => {
    const chatData = {
      title: 'Conversación ChatBot FUSO',
      date: new Date().toISOString(),
      messages: messages.map(msg => ({
        sender: msg.sender,
        text: msg.text,
        timestamp: msg.timestamp.toISOString()
      }))
    };

    // Crear y descargar archivo JSON
    const dataStr = JSON.stringify(chatData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', `chat-fuso-${new Date().toISOString().split('T')[0]}.json`);
    linkElement.click();
  };

  return (
    <div className={`chatbot-container ${className} ${theme}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        
        {/* Header con título y botones */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="text-blue-100 text-sm">En línea</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button onClick={exportChat} title="Exportar conversación">
                <Download className="w-5 h-5" />
              </button>
              <button onClick={clearChat} title="Limpiar chat">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Área de mensajes */}
        <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
          <AnimatePresence>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </AnimatePresence>
          
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />  {/* Referencia para scroll */}
        </div>

        {/* Área de input */}
        <div className="p-4 bg-white border-t">
          <div className="flex space-x-3">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
              disabled={isTyping}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
```

**¿Qué hace?** Es el componente principal que orquesta todo: maneja el estado, renderiza la interfaz, procesa los mensajes y coordina las animaciones.

---

## 📦 **11. src/components/ChatBot/index.ts** - Exportaciones

```typescript
// Exportaciones principales del ChatBot
export { default as ChatBot } from './ChatBot';
export { default as MessageBubble } from './MessageBubble';
export { default as TypingIndicator } from './TypingIndicator';
export * from './types';
export * from './botLogic';
```

**¿Qué hace?** Define qué componentes y funciones están disponibles cuando alguien importa la librería.

---

## 🎨 **12. src/index.css** - Estilos Globales

```css
@tailwind base;      /* Estilos base de Tailwind */
@tailwind components; /* Componentes de Tailwind */
@tailwind utilities;  /* Utilidades de Tailwind */

@layer components {
  .scrollbar-hide {           /* Clase personalizada para ocultar scrollbar */
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}
```

**¿Qué hace?** Importa Tailwind CSS y define estilos personalizados como ocultar la barra de scroll.

---

## 🏗️ **Flujo de Funcionamiento:**

1. **Usuario escribe mensaje** → `handleSendMessage()`
2. **Se agrega mensaje a la lista** → `setMessages()`
3. **Se activa indicador de escritura** → `setIsTyping(true)`
4. **Se procesa con la lógica del bot** → `getBotResponse()`
5. **Se agrega respuesta del bot** → `setMessages()`
6. **Se desactiva indicador** → `setIsTyping(false)`
7. **Se hace scroll automático** → `scrollToBottom()`

## 🔄 **Arquitectura del Proyecto:**

```
📁 Presentación (App.tsx)
    ↓
📁 Componente Principal (ChatBot.tsx)
    ↓
📁 Subcomponentes (MessageBubble, TypingIndicator)
    ↓
📁 Lógica de Negocio (botLogic.ts)
    ↓
📁 Tipos y Interfaces (types.ts)
```

¿Te gustaría que profundice en algún archivo específico o explique algún concepto en particular?