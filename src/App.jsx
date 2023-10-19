import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import UserContextprovider from "./Context/UserContext";
import NoteContextProvider from "./Context/NoteContext";

function App() {
  const routes = createHashRouter([
    {
      path: "",
      element:<ProtectedRoute> <Layout /></ProtectedRoute>,
      children: [{ index: true, element: <Home /> }],
    },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Register /> },
  ]);

  return (
    <>
    <UserContextprovider>
      <NoteContextProvider>
        <RouterProvider router={routes}></RouterProvider>
      
      </NoteContextProvider>
    </UserContextprovider>
    </>
  );
}

export default App;
