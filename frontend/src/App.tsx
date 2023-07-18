import React,{Fragment} from 'react';
import './style/custom.scss';
import '../node_modules/bootstrap/dist/js/bootstrap'
import Register from './components/Register';
import Login from './components/Login';
function App() {
  return (
    <Fragment>
        <div className=''>
            <Login/>
        </div>
    </Fragment>
  );
}

export default App;
