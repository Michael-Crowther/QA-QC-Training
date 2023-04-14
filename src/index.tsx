import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import dotenv from 'dotenv';

dotenv.config();

const root = document.getElementById('root') as HTMLElement;
createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export {};