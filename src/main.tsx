import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import { FavoritesProvider } from '@/contexts/FavoritesContext';

const root = document.getElementById('root');

ReactDOM.createRoot(root!).render(
  <React.StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
