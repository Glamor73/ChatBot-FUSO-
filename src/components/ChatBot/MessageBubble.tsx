import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import { Message } from './types';
import styles from './ChatBot.module.css'; // Import CSS module

interface MessageBubbleProps {
  message: Message;
  theme: 'light' | 'dark'; // Add theme prop
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, theme }) => {
  const isBot = message.sender === 'bot';
  
  const bubbleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  return (
    <motion.div
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      className={`${styles.messageBubbleContainer} ${isBot ? styles.bot : styles.user}`}
      role="listitem"
    >
      <div className={styles.messageContent}>
        {/* Avatar */}
        <div
          className={`${styles.avatar} ${isBot ? styles.bot : styles.user}`}
          aria-hidden="true"
        >
          {isBot ? <Bot className={styles.avatarIcon} /> : <User className={styles.avatarIcon} />}
        </div>
        
        {/* Message Bubble */}
        <div
          className={`${styles.bubble} ${isBot ? styles.bot : styles.user}`}
          aria-label={`${isBot ? 'Bot' : 'User'} message`}
        >
          <p>
            {message.text}
          </p>
          <p className={`${styles.timestamp} ${isBot ? styles.bot : styles.user}`}>
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