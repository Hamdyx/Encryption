import { createRoot } from 'react-dom/client';

import App from './App';

import './style/main.scss';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(<App />);
