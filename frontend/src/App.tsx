import React,{Fragment} from 'react';
import './style/custom.scss';
import '../node_modules/bootstrap/dist/js/bootstrap'
import Register from './components/Register';
import Login from './components/Login';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import Dashboard from './components/Dashboard';
function App() {
  const Routes = createBrowserRouter([
    {
      path:"/",
      element:<Login/>
    },
    {
      path:"/Register",
      element:<Register/>
    },
    {
      path:"/dashboard",
      element:<Dashboard/>
    }
  ])
  return (
    <ChakraProvider>
    <RouterProvider router={Routes}/>
    </ChakraProvider>
  );
}

export default App;
