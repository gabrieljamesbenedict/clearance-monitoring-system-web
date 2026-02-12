import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ClearanceFormPage from './pages/ClearanceFormPage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import ReportPage from './pages/ReportPage.tsx';

const router = createBrowserRouter([
  {path: "/", element: <ClearanceFormPage/>},
  {path: "/records", element: <DashboardPage/>},
  {path: "/dashboard", element: <ReportPage/>}
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
