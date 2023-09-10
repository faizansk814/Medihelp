import {Route,Routes} from 'react-router-dom'
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/dashbord';
import Particular from './pages/particular';
function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Signup/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/product/:productid' element={<Particular/>}/>
        </Routes>

    </div>
  );
}

export default App;
