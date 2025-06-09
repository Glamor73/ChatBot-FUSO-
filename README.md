# ChatBot FUSO 🤖

Un chatbot moderno y completamente funcional construido con React, TypeScript y Tailwind CSS. Diseñado para ser fácilmente integrable en cualquier proyecto.

## ✨ Características

- **Interfaz moderna**: Diseño limpio y profesional con animaciones suaves
- **Completamente responsive**: Funciona perfectamente en desktop y móvil
- **TypeScript**: Tipado fuerte para mejor desarrollo y mantenimiento
- **Animaciones**: Transiciones suaves con Framer Motion
- **Exportable**: Guarda conversaciones en formato JSON
- **Personalizable**: Fácil de customizar y extender
- **Lógica inteligente**: Sistema de respuestas basado en patrones

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone [tu-repo-url]

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

## 📦 Uso como Componente

### Importación básica

```tsx
import { ChatBot } from './components/ChatBot';

function App() {
  return (
    <div>
      <ChatBot />
    </div>
  );
}
```

### Uso avanzado con props

```tsx
import { ChatBot } from './components/ChatBot';

function App() {
  const handleMessageSent = (message: string) => {
    console.log('Usuario envió:', message);
  };

  return (
    <ChatBot
      title="Mi Asistente Virtual"
      placeholder="Escribe tu pregunta..."
      className="mi-clase-personalizada"
      theme="light"
      onMessageSent={handleMessageSent}
    />
  );
}
```

## 🛠️ Personalización

### Props disponibles

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `title` | string | "ChatBot FUSO" | Título del chatbot |
| `placeholder` | string | "Escribe tu mensaje aquí..." | Placeholder del input |
| `className` | string | "" | Clases CSS adicionales |
| `theme` | 'light' \| 'dark' | 'light' | Tema del chatbot |
| `onMessageSent` | function | undefined | Callback cuando se envía un mensaje |
| `customBotLogic` | function | undefined | Lógica personalizada del bot |

### Extender la lógica del bot

```tsx
import { addBotResponse } from './components/ChatBot/botLogic';

// Agregar nuevas respuestas
addBotResponse('greetings', [
  '¡Hola! Bienvenido a mi sitio web',
  '¡Saludos! ¿Cómo te puedo ayudar?'
]);
```

### Lógica personalizada completa

```tsx
const customLogic = async (message: string): Promise<string> => {
  if (message.includes('precio')) {
    return 'Nuestros precios varían según el servicio. ¿Te interesa algo específico?';
  }
  return 'Mensaje recibido, procesando...';
};

<ChatBot customBotLogic={customLogic} />
```

## 🎨 Personalización de Estilos

El chatbot usa Tailwind CSS y CSS custom properties para fácil personalización:

```css
:root {
  --chatbot-primary: #3b82f6;
  --chatbot-secondary: #8b5cf6;
  --chatbot-background: #ffffff;
  --chatbot-text: #1f2937;
}
```

## 📱 Responsive Design

El chatbot está completamente optimizado para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1440px+)

## 🔧 Estructura del Proyecto

```
src/
├── components/
│   └── ChatBot/
│       ├── ChatBot.tsx          # Componente principal
│       ├── MessageBubble.tsx    # Componente de mensaje
│       ├── TypingIndicator.tsx  # Indicador de escritura
│       ├── botLogic.ts          # Lógica del bot
│       ├── types.ts             # Tipos TypeScript
│       └── index.ts             # Exportaciones
├── App.tsx                      # Aplicación principal
└── main.tsx                     # Punto de entrada
```

## 🚀 Construcción como Librería

Para usar como librería en otros proyectos:

```bash
npm run build
```

Esto genera archivos optimizados en `dist/` que puedes importar en otros proyectos.

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🆘 Soporte

Si tienes preguntas o necesitas ayuda:

1. Revisa la documentación
2. Busca en los issues existentes
3. Crea un nuevo issue si es necesario

---

**¡Hecho con ❤️ para la comunidad de desarrolladores!**