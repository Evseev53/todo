import React from 'react';
import { createRoot } from 'react-dom/client';
import "./index.css"

import App from './components/app/app';

const container = document.getElementById('root');

createRoot(container).render(<App />);