import React,{Fragment} from 'react';
import './style/custom.scss';
import '../node_modules/bootstrap/dist/js/bootstrap'
import Register from './components/Register';
import Login from './components/Login';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
function App() {
  const Routes = createBrowserRouter([
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/Register",
      element:<Register/>
    }
  ])
  return <RouterProvider router={Routes}/>;
}

export default App;
