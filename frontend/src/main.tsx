import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from '@tanstack/react-query';
import queryClient from './services/queryClient';
import { i18n } from './services/i18nService';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);