import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import './styles/variables.css';
import './styles/global.css';
import './styles/scene.css';
import './styles/layout.css';
import './styles/sections.css';
import './styles/projects.css';
import './styles/finish.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
