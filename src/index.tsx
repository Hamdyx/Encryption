import React from 'react';
import App from './App';
import './style/main.scss';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(<App />);
