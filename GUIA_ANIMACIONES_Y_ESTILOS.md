# 🎨 Guía Completa: Animaciones y Personalización de Estilos

## 🎬 **ANIMACIONES CON FRAMER MOTION**

### 1. **Animaciones de Entrada (Initial/Animate)**

```typescript
// En ChatBot.tsx - Animación del contenedor principal
<motion.div
  initial={{ opacity: 0, y: 20 }}    // Estado inicial: invisible y 20px abajo
  animate={{ opacity: 1, y: 0 }}     // Estado final: visible y en posición
  className="bg-white rounded-2xl shadow-2xl overflow-hidden"
>
```

**¿Qué hace?**
- `initial`: El componente aparece invisible (`opacity: 0`) y desplazado 20px hacia abajo (`y: 20`)
- `animate`: Se anima hasta ser completamente visible (`opacity: 1`) y en su posición original (`y: 0`)
- **Resultado**: Efecto de "deslizar hacia arriba" al cargar

### 2. **Animaciones de Mensajes (MessageBubble.tsx)**

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}      // Animación de salida
  className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}
>
```

**¿Qué hace?**
- Cada mensaje nuevo aparece con el mismo efecto de deslizar
- `exit`: Si se elimina, se desvanece y sube 20px
- **Resultado**: Mensajes que aparecen suavemente uno por uno

### 3. **Animación del Indicador de Escritura (TypingIndicator.tsx)**

```typescript
// Los tres puntos que "bailan"
<motion.div
  animate={{ scale: [1, 1.2, 1] }}           // Escala de 1 → 1.2 → 1
  transition={{ 
    duration: 1,                              // Duración de 1 segundo
    repeat: Infinity,                         // Se repite infinitamente
    delay: 0                                  // Sin delay
  }}
  className="w-2 h-2 bg-gray-400 rounded-full"
/>
<motion.div
  animate={{ scale: [1, 1.2, 1] }}
  transition={{ 
    duration: 1, 
    repeat: Infinity, 
    delay: 0.2                                // Delay de 0.2s (efecto cascada)
  }}
  className="w-2 h-2 bg-gray-400 rounded-full"
/>
<motion.div
  animate={{ scale: [1, 1.2, 1] }}
  transition={{ 
    duration: 1, 
    repeat: Infinity, 
    delay: 0.4                                // Delay de 0.4s
  }}
  className="w-2 h-2 bg-gray-400 rounded-full"
/>
```

**¿Qué hace?**
- Cada punto se agranda y encoge en secuencia
- El delay escalonado (0, 0.2, 0.4) crea el efecto de "onda"
- **Resultado**: Animación clásica de "escribiendo..."

### 4. **Animaciones de Botones (Hover/Tap)**

```typescript
<motion.button
  whileHover={{ scale: 1.05 }}              // Se agranda 5% al pasar el mouse
  whileTap={{ scale: 0.95 }}                // Se encoge 5% al hacer clic
  onClick={handleSendMessage}
  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600"
>
```

**¿Qué hace?**
- `whileHover`: Feedback visual al pasar el mouse
- `whileTap`: Feedback táctil al hacer clic
- **Resultado**: Botones que se sienten "vivos" y responsivos

### 5. **AnimatePresence para Listas Dinámicas**

```typescript
<AnimatePresence>
  {messages.map((message) => (
    <MessageBubble key={message.id} message={message} />
  ))}
</AnimatePresence>
```

**¿Qué hace?**
- Permite que los elementos que se eliminan tengan animación de salida
- Gestiona automáticamente las animaciones cuando la lista cambia
- **Resultado**: Transiciones suaves al agregar/quitar mensajes

---

## 🎨 **PERSONALIZACIÓN DE COLORES Y ESTILOS**

### 1. **Sistema de Colores con CSS Variables (App.css)**

```css
:root {
  /* Colores principales */
  --background: 0 0% 100%;                    /* Blanco puro */
  --foreground: 222.2 84% 4.9%;              /* Gris muy oscuro */
  
  /* Colores de interfaz */
  --primary: 222.2 47.4% 11.2%;              /* Azul oscuro */
  --primary-foreground: 210 40% 98%;         /* Blanco suave */
  
  /* Colores de estado */
  --destructive: 0 84.2% 60.2%;              /* Rojo para errores */
  --border: 214.3 31.8% 91.4%;               /* Gris claro para bordes */
}
```

**Cómo cambiar colores:**
```css
:root {
  --primary: 120 100% 50%;                    /* Verde brillante */
  --background: 240 10% 5%;                   /* Fondo oscuro */
}
```

### 2. **Gradientes Personalizados**

**Gradiente actual del header:**
```typescript
className="bg-gradient-to-r from-blue-600 to-purple-600"
```

**Ejemplos de gradientes personalizados:**
```typescript
// Gradiente sunset
className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500"

// Gradiente océano
className="bg-gradient-to-r from-cyan-500 to-blue-500"

// Gradiente bosque
className="bg-gradient-to-r from-green-400 to-emerald-600"

// Gradiente nocturno
className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900"
```

### 3. **Personalización del Avatar del Bot**

**Actual:**
```typescript
<div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center">
  <Bot className="w-4 h-4" />
</div>
```

**Versiones personalizadas:**
```typescript
// Avatar dorado
<div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500">

// Avatar neón
<div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-violet-500">

// Avatar corporativo
<div className="w-8 h-8 rounded-full bg-gradient-to-r from-slate-700 to-slate-900">
```

### 4. **Burbujas de Mensaje Personalizadas**

**Mensajes del bot:**
```typescript
className={`px-4 py-2 rounded-2xl ${
  isBot 
    ? 'bg-white text-gray-800 shadow-md border'     // Estilo actual
    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
}`}
```

**Estilos alternativos:**
```typescript
// Estilo glassmorphism
isBot 
  ? 'bg-white/80 backdrop-blur-sm text-gray-800 shadow-lg border border-white/20'
  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'

// Estilo minimalista
isBot 
  ? 'bg-gray-100 text-gray-900 border-l-4 border-blue-500'
  : 'bg-blue-600 text-white'

// Estilo neomorfismo
isBot 
  ? 'bg-gray-100 text-gray-800 shadow-inner'
  : 'bg-blue-600 text-white shadow-lg'
```

---

## 🎭 **TEMAS PERSONALIZADOS COMPLETOS**

### 1. **Tema Oscuro**

```typescript
// En ChatBot.tsx, agregar lógica de tema
const darkTheme = {
  container: "bg-gray-900",
  header: "bg-gradient-to-r from-gray-800 to-gray-700",
  messagesArea: "bg-gray-800",
  botMessage: "bg-gray-700 text-gray-100",
  userMessage: "bg-blue-600 text-white",
  input: "bg-gray-700 text-white border-gray-600"
};
```

### 2. **Tema Corporativo**

```typescript
const corporateTheme = {
  container: "bg-slate-50",
  header: "bg-gradient-to-r from-slate-800 to-slate-700",
  messagesArea: "bg-white",
  botMessage: "bg-slate-100 text-slate-800 border-l-4 border-slate-500",
  userMessage: "bg-slate-700 text-white"
};
```

### 3. **Tema Colorido/Divertido**

```typescript
const funTheme = {
  container: "bg-gradient-to-br from-pink-100 to-purple-100",
  header: "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500",
  messagesArea: "bg-white/50 backdrop-blur-sm",
  botMessage: "bg-white text-purple-800 shadow-lg border border-purple-200",
  userMessage: "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
};
```

---

## ⚡ **ANIMACIONES AVANZADAS PERSONALIZADAS**

### 1. **Animación de Escritura Personalizada**

```typescript
// En tailwind.config.js - Agregar nuevas animaciones
keyframes: {
  typewriter: {
    "0%": { width: "0%" },
    "100%": { width: "100%" }
  },
  blink: {
    "0%, 50%": { borderColor: "transparent" },
    "51%, 100%": { borderColor: "currentColor" }
  },
  slideInLeft: {
    "0%": { transform: "translateX(-100%)", opacity: "0" },
    "100%": { transform: "translateX(0)", opacity: "1" }
  },
  slideInRight: {
    "0%": { transform: "translateX(100%)", opacity: "0" },
    "100%": { transform: "translateX(0)", opacity: "1" }
  }
},
animation: {
  typewriter: "typewriter 2s steps(20) infinite",
  blink: "blink 1s infinite",
  "slide-in-left": "slideInLeft 0.5s ease-out",
  "slide-in-right": "slideInRight 0.5s ease-out"
}
```

### 2. **Usar las Nuevas Animaciones**

```typescript
// Mensajes que entran desde los lados
<motion.div
  initial={{ x: isBot ? -100 : 100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ type: "spring", stiffness: 100 }}
  className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
>
```

### 3. **Animación de Partículas de Fondo**

```typescript
// Componente de partículas flotantes
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-200 rounded-full"
          animate={{
            y: [-20, -100],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}
    </div>
  );
};
```

---

## 🛠️ **IMPLEMENTACIÓN PRÁCTICA**

### 1. **Crear un Sistema de Temas**

```typescript
// themes.ts
export const themes = {
  default: {
    primary: "from-blue-600 to-purple-600",
    secondary: "bg-white",
    text: "text-gray-800"
  },
  dark: {
    primary: "from-gray-800 to-gray-700",
    secondary: "bg-gray-900",
    text: "text-gray-100"
  },
  ocean: {
    primary: "from-cyan-500 to-blue-600",
    secondary: "bg-blue-50",
    text: "text-blue-900"
  }
};
```

### 2. **Aplicar Temas Dinámicamente**

```typescript
// En ChatBot.tsx
const [currentTheme, setCurrentTheme] = useState('default');
const theme = themes[currentTheme];

// Usar en los componentes
className={`bg-gradient-to-r ${theme.primary}`}
```

### 3. **Selector de Temas**

```typescript
const ThemeSelector = () => (
  <div className="flex space-x-2">
    {Object.keys(themes).map(themeName => (
      <button
        key={themeName}
        onClick={() => setCurrentTheme(themeName)}
        className="w-6 h-6 rounded-full border-2"
        style={{ background: themes[themeName].primary }}
      />
    ))}
  </div>
);
```

¿Te gustaría que implemente alguno de estos temas o animaciones específicas en el proyecto? ¡Podemos hacer que el chatbot se vea exactamente como lo imaginas!