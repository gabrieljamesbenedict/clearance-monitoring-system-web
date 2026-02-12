import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ClearanceFormPage from './pages/ClearanceFormPage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';

const router = createBrowserRouter([
  {path: "/", element: <ClearanceFormPage/>},
  {path: "/dashboard", element: <DashboardPage/>}
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
