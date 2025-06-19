import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Layout from './pages/Layout.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout />
  </StrictMode>
);
