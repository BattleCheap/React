import React from 'react';
import ReactDOM from 'react-dom/client'; // Corrigez l'import ici
import { BrowserRouter } from 'react-router-dom'; // Assurez-vous que BrowserRouter est importé
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
