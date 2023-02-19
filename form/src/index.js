import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './component/Home';
import About from './component/About';
import Contact from './component/Contact';
import Signin from './component/Signin';
import Signup from "./component/Signup";
import App from './App';
// import Navbar from './component/Navbar';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Signup/>,
  },
  {
    path: "home",
    element: <Home/>,
  },
  {
    path: "about",
    element: <About/>,
  },
  {
    path: "contact",
    element: <Contact />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "signin",
    element: <Signin />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router}>
        <App/>
    </RouterProvider>
)