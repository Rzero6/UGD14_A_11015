import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Authentication from "./pages/Authentication";
import GroupChat from "./pages/GroupChat";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Authentication />,
    },
    {
      path: "/groupchat",
      element: <GroupChat />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
