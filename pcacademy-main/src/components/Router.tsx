import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
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
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "concepts",
        element: <ConceptsPage />,
        routeMetadata: {
          pageIdentifier: 'concepts',
        },
      },
      {
        path: "mathematical-breakdown",
        element: <MathematicalBreakdownPage />,
        routeMetadata: {
          pageIdentifier: 'mathematical-breakdown',
        },
      },
      {
        path: "calculators",
        element: <CalculatorsPage />,
        routeMetadata: {
          pageIdentifier: 'calculators',
        },
      },
      {
        path: "visualizations",
        element: <VisualizationsPage />,
        routeMetadata: {
          pageIdentifier: 'visualizations',
        },
      },
      {
        path: "examples",
        element: <ExamplesPage />,
        routeMetadata: {
          pageIdentifier: 'examples',
        },
      },
      {
        path: "references",
        element: <ReferencesPage />,
        routeMetadata: {
          pageIdentifier: 'references',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
