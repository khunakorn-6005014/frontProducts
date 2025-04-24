//react-app react-axios-typescript-example/index.tsx
// entry point of React app, where the entire application is bootstrapped.
import React from 'react';
import ReactDOM from 'react-dom/client'; // Change the import
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    );
} else {
    console.error("Root element not found!");
}