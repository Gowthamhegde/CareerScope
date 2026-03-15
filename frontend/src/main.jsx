import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

/* ✅ FIX #12: Add global error handler to prevent white screen */
window.onerror = function(msg, url, lineNo, columnNo, error) {
  console.error('Global error:', msg, error);
  return false;
};

/* ✅ FIX #13: Ensure root element exists before rendering */
const rootElement = document.getElementById('root');
if (!rootElement) {
  document.body.innerHTML = '<div style="color:red;padding:20px;font-family:monospace;">Error: Root element not found</div>';
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(15, 23, 42, 0.95)',
            color: '#ffffff',
            border: '1px solid rgba(0, 212, 200, 0.2)',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
          },
          success: {
            iconTheme: {
              primary: '#00D4C8',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>,
)