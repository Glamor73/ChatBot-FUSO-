import { BotResponse } from './types';

// Base de conocimiento del bot
const responses = {
  greetings: [
    "¡Hola! ¿Cómo puedo ayudarte hoy?",
    "¡Saludos! Estoy aquí para asistirte.",
    "¡Hola! Es un placer poder ayudarte.",
  ],
  
  help: [
    "Puedo ayudarte con información general, responder preguntas frecuentes, y asistirte con diversas consultas. ¿Qué necesitas saber?",
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

// Función principal para obtener respuesta del bot
export const getBotResponse = async (userMessage: string): Promise<string> => {
  const message = userMessage.toLowerCase().trim();
  
  // Verificar patrones
  for (const [category, pattern] of Object.entries(patterns)) {
    if (pattern.test(message)) {
      const categoryResponses = responses[category as keyof typeof responses];
      return getRandomResponse(categoryResponses);
    }
  }
  
  // Respuestas específicas por palabras clave
  if (message.includes('tiempo') || message.includes('hora')) {
    return `La hora actual es ${new Date().toLocaleTimeString()}. ¿En qué más puedo ayudarte?`;
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
  if (message.includes('edad')) {
    return "No tengo una edad específica, pero fui creado para ayudarte con tus consultas. ¿Hay algo más que te gustaría saber?";
  }
   if (message.includes('cesar')) {
    return "Es un muy buen profesor, siempre dispuesto a ayudar y compartir su conocimiento. ¿Te gustaría saber algo más sobre él?, mentiras siempre esta puto, pero es un buen profesor.";
  }
  
  if (message.includes('clima') || message.includes('tiempo meteorológico')) {
    return "No tengo acceso a información meteorológica en tiempo real, pero te recomiendo consultar un servicio de clima confiable. ¿Hay algo más en lo que pueda ayudarte?";
  }


  
  // Respuesta por defecto
  return getRandomResponse(responses.default);
};

// Función auxiliar para obtener respuesta aleatoria
const getRandomResponse = (responseArray: string[]): string => {
  return responseArray[Math.floor(Math.random() * responseArray.length)];
};

// Función para agregar nuevas respuestas (extensibilidad)
export const addBotResponse = (category: string, newResponses: string[]) => {
  if (responses[category as keyof typeof responses]) {
    responses[category as keyof typeof responses].push(...newResponses);
  }
};