import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/Error";
import fetchUsers from "./loaders/users";
import User from "./pages/User";
import fetchUser from "./loaders/user";
import UserList from "./pages/UserList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <UserList />,
        loader: fetchUsers,
      },
      {
        path: "users/:userId",
        element: <User />,
        loader: fetchUser,
      },
    ],
  },
]);

export default router;
