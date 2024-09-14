import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "@/pages/Error";
import fetchUsers from "@/loaders/users";
import User from "@/pages/User";
import fetchUser from "@/loaders/user";
import UserList from "@/pages/UserList";
import fetchEventsToBet from "@/loaders/eventToBet";
import sendPrediction from "@/actions/sendPrediction";
import Predict from "@/pages/Predict";
import Event from "@/pages/Event";
import fetchEventWithPredictions from "@/loaders/eventWithPredictions";

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
      {
        path: "predict/:userId",
        element: <Predict />,
        loader: fetchEventsToBet,
        action: sendPrediction,
      },
      {
        path: "event/:eventId",
        element: <Event />,
        loader: fetchEventWithPredictions,
      },
    ],
  },
]);

export default router;
