import {Route,Routes} from 'react-router-dom'
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/dashbord';
import Particular from './pages/particular';
import Cart from './pages/cart';
import Payment from './pages/payment';
function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Signup/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/product/:productid' element={<Particular/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/payment' element={<Payment/>}/>
        </Routes>

    </div>
  );
}

export default App;
