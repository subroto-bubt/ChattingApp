import "./App.css";
import Ragistration from "./pages/Ragistration";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import LoggedInUserRoute from "./PrivateRoute/LoggedInUserRoute";
import NotLoggedInUserRoute from "./PrivateRoute/NotLoggedInUserRoute";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<LoggedInUserRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<NotLoggedInUserRoute />}>
          <Route path="/ragistration" element={<Ragistration />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
