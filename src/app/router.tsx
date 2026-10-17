import { createBrowserRouter, createHashRouter } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './HomePage';
import { ProjectRoute } from './ProjectRoute';

/**
 * The home page is a layout route, so opening a project (/projects/:slug) renders the
 * case study above it without remounting the page or the 3D scene.
 */
export const useHashRouting = import.meta.env.VITE_ROUTER === 'hash';
const create = useHashRouting ? createHashRouter : createBrowserRouter;

export const router = create([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <HomePage />,
        children: [
          { index: true, element: null },
          { path: 'projects/:slug', element: <ProjectRoute /> },
          { path: '*', element: null },
        ],
      },
    ],
  },
]);
