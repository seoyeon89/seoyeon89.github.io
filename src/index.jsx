import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import reportWebVitals from './reportWebVitals';

import './assets/css/style.scss';

const base = import.meta.env.MODE === 'production'
    ? '/seoyeon89.github.io/'
    : '/';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter basename={base}>
        <App />
    </BrowserRouter>
);

reportWebVitals();
