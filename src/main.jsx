import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { VolunteerProvider } from './context/VolunteerContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <VolunteerProvider>
      <App />
    </VolunteerProvider>
  </React.StrictMode>,
);
