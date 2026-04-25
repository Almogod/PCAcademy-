import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import HomePage from '@/components/pages/HomePage';
import ConceptsPage from '@/components/pages/ConceptsPage';
import MathematicalBreakdownPage from '@/components/pages/MathematicalBreakdownPage';
import CalculatorsPage from '@/components/pages/CalculatorsPage';
import VisualizationsPage from '@/components/pages/VisualizationsPage';
import ExamplesPage from '@/components/pages/ExamplesPage';
import ReferencesPage from '@/components/pages/ReferencesPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "concepts",
        element: <ConceptsPage />,
      },
      {
        path: "mathematical-breakdown",
        element: <MathematicalBreakdownPage />,
      },
      {
        path: "calculators",
        element: <CalculatorsPage />,
      },
      {
        path: "visualizations",
        element: <VisualizationsPage />,
      },
      {
        path: "examples",
        element: <ExamplesPage />,
      },
      {
        path: "references",
        element: <ReferencesPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: "/PCAcademy-",
});

export default function AppRouter() {
  return (
    <RouterProvider router={router} />
  );
}
