import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import { Message } from './types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div className={`flex max-w-xs lg:max-w-md ${isBot ? 'flex-row' : 'flex-row-reverse'} items-end space-x-2`}>
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isBot 
            ? 'bg-gradient-to-r from-blue-500 to-red-500 text-white p-1' 
            : 'bg-gray-300 text-gray-600'
        }`}>
          {isBot ? (
            <img 
              src="/robot-logo.svg" 
              alt="Bot" 
              className="w-6 h-6"
            />
          ) : (
            <User className="w-4 h-4" />
          )}
        </div>
        
        {/* Message Bubble */}
        <div className={`px-4 py-2 rounded-2xl ${
          isBot 
            ? 'bg-white text-gray-800 shadow-md border' 
            : 'bg-gradient-to-r from-blue-600 to-red-600 text-white'
        } ${isBot ? 'rounded-bl-sm' : 'rounded-br-sm'}`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.text}
          </p>
          <p className={`text-xs mt-1 ${
            isBot ? 'text-gray-500' : 'text-blue-100'
          }`}>
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;