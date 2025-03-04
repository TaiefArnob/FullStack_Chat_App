import React from 'react';
import { MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const NoChatSelected = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 bg-opacity-80">
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <MessageSquare className="size-16 text-blue-400" />
        </motion.div>
      </motion.div>
      
      {/* App Name & Description */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-4"
      >
        <h1 className="text-3xl font-bold text-white">Welcome to <span className="bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">Bleep</span></h1>
        <p className="mt-2 text-zinc-300">Bleep is a fast and secure chat application that keeps you connected with your friends and loved ones in real-time.</p>
      </motion.div>
      
      {/* Decorative Animation */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-8"
      >
        <p className="text-lg text-zinc-400 italic">Select a chat to start messaging...</p>
      </motion.div>
      
      {/* Creator Watermark */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-4 text-sm text-zinc-500"
      >
        Created by <span className="font-semibold">Taief Arnob</span>
      </motion.div>
    </div>
  );
};

export default NoChatSelected;
