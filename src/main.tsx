import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import { MswProvider } from './components/MswWrapper';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MswProvider>
      <App />
    </MswProvider>
  </StrictMode>,
);
