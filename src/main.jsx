import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

console.log('RSS Generator Pro - Application starting...');

try {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('React app rendered successfully');
} catch (error) {
  console.error('Error rendering app:', error);
  document.getElementById('root').innerHTML = `
    <div style="padding: 20px; text-align: center; font-family: Arial;">
      <h1>RSS Generator Pro</h1>
      <p>Error loading application. Please refresh the page.</p>
      <p style="color: red;">${error.message}</p>
    </div>
  `;
  }
