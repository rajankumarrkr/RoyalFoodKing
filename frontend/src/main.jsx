import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

console.log("Royal Food King: Mounting Application...");

const root = document.getElementById('root');
if (!root) {
    console.error("Root element not found!");
} else {
    ReactDOM.createRoot(root).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    )
}
