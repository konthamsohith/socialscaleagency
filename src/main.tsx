import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import { NotificationProvider } from './context/NotificationContext.tsx';
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <HelmetProvider>
            <NotificationProvider>
                <App />
            </NotificationProvider>
        </HelmetProvider>
    </React.StrictMode>,
)
