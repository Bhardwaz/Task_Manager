import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Home";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Welcome from "./components/Welcome";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./utils/store";
import AllUsers from "./components/AllUsers";
const root = ReactDOM.createRoot(document.getElementById("root"));

const AppLayout = () => {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Outlet />
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Welcome />,
      },
      {
        path: "/allUsers",
        element: <AllUsers />,
      },
    ],
  },
]);

root.render(<RouterProvider router={appRouter} />);
