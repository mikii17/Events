import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Home from "./pages/Home.tsx";
import Event from "./pages/Event.tsx";
import Register from "./pages/SignUp.tsx";
import Error from "./pages/Error.tsx";
import App from "./App.tsx";
import Signup from "./pages/auth/Signup.tsx";
import ChangePassword from "./pages/auth/ChangePassword.tsx";
import Login from "./pages/auth/Login.tsx";
import AuthProvider from "./context/AuthContext.tsx";
import ProtectionLayout from "./components/ProtectionLayout.tsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <Error />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/event/:id",
//         element: <Event />,
//       },
//       {
//         path: "/signup",
//         element: <Register />,
//       },
//     ],
//   },
// ]);

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/events/:id" element={<Event />} />
      <Route path="/register/:id" element={<Register />} />
      <Route element={<ProtectionLayout />}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Route>
      <Route path="*" element={<Error />} /> // TODO: 404 page
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
