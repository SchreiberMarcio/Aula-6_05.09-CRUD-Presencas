import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../../pages/Home";
import { Biblioteca } from "../../pages/Biblioteca";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <h1>Error Page</h1>,
  },
  {
    path: "/biblioteca",
    element: <Biblioteca />,
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
