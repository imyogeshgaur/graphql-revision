import { useRoutes } from "react-router";
import allRoutes from "./routes";
import { Suspense } from "react";
import Loader from "./components/Loader";

const App = () => {
  const routes = useRoutes(allRoutes);
  return <Suspense fallback={<Loader />}>{routes}</Suspense>;
};

export default App;
