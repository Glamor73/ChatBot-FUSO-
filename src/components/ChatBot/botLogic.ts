import { BotResponse } from './types'; // BotResponse seems unused, but we'll keep it for now.

// Base de conocimiento del bot
const responses = {
  greetings: [
    "¡Hola! ¿Cómo puedo ayudarte hoy?",
    "¡Saludos! Estoy aquí para asistirte.",
    "¡Hola! Es un placer poder ayudarte.",
  ],
  help: [
    "Puedo ayudarte con información general, responder preguntas frecuentes y asistirte con diversas consultas. ¿Qué necesitas saber?",
    "Estoy aquí para ayudarte. Puedes preguntarme sobre cualquier tema y haré mi mejor esfuerzo por asistirte.",
  ],
  capabilities: [
    "Soy un chatbot inteligente que puede:\n• Responder preguntas generales\n• Proporcionar información útil\n• Mantener conversaciones naturales\n• Ayudarte con consultas específicas",
    "Mis capacidades incluyen responder preguntas, proporcionar información y mantener conversaciones útiles contigo.",
  ],
  thanks: [
    "¡De nada! Estoy aquí para ayudarte siempre que lo necesites.",
    "¡Un placer ayudarte! ¿Hay algo más en lo que pueda asistirte?",
    "¡Encantado de poder ayudar! No dudes en preguntar si necesitas algo más.",
  ],
  goodbye: [
    "¡Hasta luego! Que tengas un excelente día.",
    "¡Nos vemos! Estaré aquí cuando me necesites.",
    "¡Adiós! Fue un placer conversar contigo.",
  ],
  error: [
    "Lo siento, he encontrado un problema al procesar tu solicitud. Por favor, inténtalo de nuevo.",
    "Vaya, algo no salió como esperaba. ¿Podrías intentarlo otra vez?",
  ],
  default: [
    "Interesante pregunta. Aunque no tengo una respuesta específica para eso, puedo ayudarte con información general o dirigirte hacia recursos útiles.",
    "No estoy seguro de cómo responder a eso específicamente, pero estoy aquí para ayudarte con lo que pueda. ¿Podrías reformular tu pregunta?",
    "Esa es una consulta interesante. Aunque mi conocimiento es limitado en algunos temas, haré mi mejor esfuerzo por ayudarte.",
  ]
};

// Patrones de reconocimiento
const patterns = {
  greetings: /\b(hola|hi|hello|saludos|buenos días|buenas tardes|buenas noches|hey)\b/i,
  help: /\b(ayuda|help|asistencia|soporte|qué puedes hacer)\b/i,
  capabilities: /\b(qué eres|quién eres|capacidades|funciones|para qué sirves)\b/i,
  thanks: /\b(gracias|thank you|thanks|te agradezco)\b/i,
  goodbye: /\b(adiós|bye|hasta luego|nos vemos|chao|goodbye)\b/i,
};

// Función auxiliar para obtener respuesta aleatoria
const getRandomResponse = (responseArray: string[]): string => {
  if (!responseArray || responseArray.length === 0) {
    // Fallback a una respuesta de error genérica si el array está vacío o no existe
    return responses.error[0];
  }
  return responseArray[Math.floor(Math.random() * responseArray.length)];
};

// Función principal para obtener respuesta del bot
export const getBotResponse = async (userMessage: string): Promise<string> => {
  try {
    if (typeof userMessage !== 'string' || !userMessage.trim()) {
      // console.warn('getBotResponse: userMessage is empty or not a string.');
      return getRandomResponse(responses.default); // Or a specific "empty message" response
    }

    const message = userMessage.toLowerCase().trim();
  
    // Verificar patrones
    for (const [category, pattern] of Object.entries(patterns)) {
      if (pattern.test(message)) {
        const categoryKey = category as keyof typeof responses;
        if (responses[categoryKey]) {
          return getRandomResponse(responses[categoryKey]);
        }
      }
    }
  
    // Respuestas específicas por palabras clave
    if (message.includes('tiempo') || message.includes('hora')) {
      return `La hora actual es ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}. ¿En qué más puedo ayudarte?`;
    }
  
    if (message.includes('fecha') || message.includes('día')) {
      return `Hoy es ${new Date().toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}. ¿Necesitas algo más?`;
    }
  
    if (message.includes('nombre')) {
      return "Soy ChatBot FUSO, tu asistente virtual inteligente. ¿En qué puedo ayudarte?";
    }
  
    if (message.includes('clima') || message.includes('tiempo meteorológico')) {
      return "No tengo acceso a información meteorológica en tiempo real, pero te recomiendo consultar un servicio de clima confiable. ¿Hay algo más en lo que pueda ayudarte?";
    }
  
    // Respuesta por defecto
    return getRandomResponse(responses.default);

  } catch (error) {
    console.error("Error in getBotResponse:", error);
    return getRandomResponse(responses.error);
  }
};


// Función para agregar nuevas respuestas (extensibilidad)
// Considerar hacer esta función más robusta, e.g., validar inputs
export const addBotResponse = (category: string, newResponses: string | string[]) => {
  if (typeof category !== 'string' || !category.trim()) {
    console.error("addBotResponse: Category must be a non-empty string.");
    return false;
  }
  if (!Array.isArray(newResponses) && typeof newResponses !== 'string') {
    console.error("addBotResponse: newResponses must be a string or an array of strings.");
    return false;
  }
  if (typeof newResponses === 'string' && !newResponses.trim()) {
    console.error("addBotResponse: New response string cannot be empty.");
    return false;
  }
  if (Array.isArray(newResponses) && (newResponses.length === 0 || newResponses.some(r => typeof r !== 'string' || !r.trim()))) {
    console.error("addBotResponse: New responses array cannot be empty or contain empty strings.");
    return false;
  }

  const categoryKey = category as keyof typeof responses;

  if (!responses[categoryKey]) {
    // Si la categoría no existe, podríamos crearla
    // responses[categoryKey] = []; // This line has a type error because categoryKey might not be a valid key
    // For now, let's only add to existing categories or log a warning.
    console.warn(`addBotResponse: Category "${category}" does not exist. Responses not added.`);
    return false;
  }

  const responsesToAdd = Array.isArray(newResponses) ? newResponses : [newResponses];
  // Filter out any empty strings again just in case, though prior checks should catch this
  const validResponses = responsesToAdd.filter(r => r.trim());

  if (validResponses.length > 0) {
    // responses[categoryKey].push(...validResponses); // This also has a type error
    // A safer way to handle this with current structure, though less dynamic for new categories:
    const currentCategoryResponses = responses[categoryKey];
    if (Array.isArray(currentCategoryResponses)) {
        currentCategoryResponses.push(...validResponses);
        return true;
    } else {
        console.error(`addBotResponse: Category "${category}" exists but is not an array.`);
        return false;
    }
  }
  return false;
};