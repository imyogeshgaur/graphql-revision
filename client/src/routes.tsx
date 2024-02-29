import { lazy } from "react";

const LoginPage = lazy(() => import("./pages/Auth/Login"));
const UserRegisterPage = lazy(() => import("./pages/Auth/UserRegister"));
const AddressRegisterPage = lazy(() => import("./pages/Auth/AddressRegister"));
const HomePage = lazy(() => import("./pages/Home/Home"));

const allRoutes = [
  { path: "/", element: <LoginPage /> },
  { path: "/registerUser", element: <UserRegisterPage /> },
  { path: "/registerAddress", element: <AddressRegisterPage /> },
  { path: "/home", element: <HomePage /> },
];

export default allRoutes;
