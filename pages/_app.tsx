import React from 'react';
import type { AppProps } from 'next/app';
import { motion, AnimatePresence } from 'framer-motion';
import { Inter } from '@next/font/google';
import { AppProvider } from '../contexts';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <div className={inter.className}>
        <AnimatePresence mode="wait">
          <motion.div
            key={Component.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </div>
    </AppProvider>
  );
}