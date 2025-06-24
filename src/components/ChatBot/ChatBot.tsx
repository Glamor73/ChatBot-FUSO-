import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Trash2, Download } from 'lucide-react';
import { Message, ChatBotProps } from './types';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { getBotResponse } from './botLogic';
import styles from './ChatBot.module.css'; // Import CSS module

const ChatBot: React.FC<ChatBotProps> = ({
  title = "ChatBot FUSO",
  placeholder = "Escribe tu mensaje aquí...",
  className = "",
  theme = "light"
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy tu asistente virtual FUSO. ¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue; // Store inputValue before clearing
    setInputValue('');
    setIsTyping(true);

    // Simular delay de respuesta del bot
    setTimeout(async () => {
      const botResponse = await getBotResponse(currentInput); // Use stored input
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      inputRef.current?.focus(); // Refocus input after bot response
    }, 1000 + Math.random() * 1000); // Reduced max delay
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        text: '¡Hola! Soy tu asistente virtual FUSO. ¿En qué puedo ayudarte hoy?',
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
    inputRef.current?.focus();
  };

  const exportChat = () => {
    const chatData = {
      title: `Conversación ChatBot FUSO (${theme})`,
      date: new Date().toISOString(),
      messages: messages.map(msg => ({
        sender: msg.sender,
        text: msg.text,
        timestamp: msg.timestamp.toISOString()
      }))
    };

    const dataStr = JSON.stringify(chatData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `chat-fuso-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    document.body.appendChild(linkElement); // Required for Firefox
    linkElement.click();
    document.body.removeChild(linkElement); // Clean up
  };

  useEffect(() => {
    inputRef.current?.focus(); // Focus input on initial load
  }, []);

  return (
    <div className={`${styles.chatbotContainer} ${styles[theme]} ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={styles.chatWindow}
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerTitleGroup}>
              <div className={styles.headerIconContainer}>
                <Bot className={styles.headerIcon} aria-hidden="true" />
              </div>
              <div>
                <h3 className={styles.titleText}>{title}</h3>
                <p className={styles.statusText}>En línea</p>
              </div>
            </div>
            <div className={styles.headerActions}>
              <button
                onClick={exportChat}
                className={styles.actionButton}
                title="Exportar conversación"
                aria-label="Exportar conversación"
              >
                <Download className={styles.actionIcon} aria-hidden="true" />
              </button>
              <button
                onClick={clearChat}
                className={styles.actionButton}
                title="Limpiar chat"
                aria-label="Limpiar chat"
              >
                <Trash2 className={styles.actionIcon} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className={styles.messagesArea} aria-live="polite" role="log" aria-atomic="false" aria-relevant="additions">
          <div role="list"> {/* Added role="list" for a list of messages */}
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} theme={theme} />
              ))}
            </AnimatePresence>
          </div>
          {isTyping && <TypingIndicator theme={theme} />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className={styles.inputArea}>
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className={styles.inputRow}>
            <div className={styles.inputWrapper}>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress} // Keep for Enter key press without Shift
                placeholder={placeholder}
                className={styles.textInput}
                disabled={isTyping}
                aria-label="Escribe tu mensaje"
                autoComplete="off"
              />
            </div>
            <motion.button
              type="submit" // Changed to type submit for form
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!inputValue.trim() || isTyping}
              className={styles.sendButton}
              aria-label="Enviar mensaje"
            >
              <Send className={styles.sendIcon} aria-hidden="true" />
              <span className={styles.sendButtonText}>Enviar</span>
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatBot;