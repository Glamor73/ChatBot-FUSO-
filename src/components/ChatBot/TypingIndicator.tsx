import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import styles from './ChatBot.module.css'; // Import CSS module

interface TypingIndicatorProps {
  theme: 'light' | 'dark';
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ theme }) => {
  // The main animation for dots is now in ChatBot.module.css (typingAnimation)
  // motion.div for the container is kept for initial appear animation.

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3 }}
      className={`${styles.messageBubbleContainer} ${styles.bot}`} // Use message bubble container styling for alignment
      role="status" // More appropriate role for a status indicator
      aria-live="assertive"
      aria-label="Bot está escribiendo"
    >
      <div className={styles.messageContent}> {/* Mimic MessageBubble structure for alignment */}
        <div
          className={`${styles.avatar} ${styles.bot}`}
          aria-hidden="true"
        >
          <Bot className={styles.avatarIcon} />
        </div>
        <div className={`${styles.bubble} ${styles.bot}`}> {/* Mimic bubble for consistent look */}
          <div className={styles.typingIndicator}> {/* Actual typing dots container */}
            <div className={styles.typingDot} />
            <div className={styles.typingDot} />
            <div className={styles.typingDot} />
          </div>
          <span className={styles.srOnly}>Bot está escribiendo...</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;