import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import reportWebVitals from './reportWebVitals';

import './assets/css/style.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter basename="/seoyeon89.github.io">
        <App />
    </BrowserRouter>
);

reportWebVitals();
