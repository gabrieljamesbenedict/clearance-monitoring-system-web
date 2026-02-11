import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ClearanceFormPage from './pages/ClearanceFormPage.tsx';

const router = createBrowserRouter([
  {path: "/", element: <ClearanceFormPage/>}
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
