import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import AddOrder from './Components/Add-Order/AddOrder';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './Actions/userAction';
import { useEffect } from 'react';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import MyOrders from './Components/My-Orders/MyOrders';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(loadUser());
  }, [dispatch]);

  const { isAuthenticated } = useSelector((state) => state.user);

  return (
      <Router>
          <Routes>
              {isAuthenticated && (
                  <Route path='/me' element={<Profile />} exact />
              )}
              <Route path="/" element={<Home />} exact />

              <Route path="/login-user" element={<Login />} exact />
              <Route path="/add-user" element={<Register />} exact />

              {isAuthenticated && (
                  <Route path="/add-order" element={<AddOrder />} exact />
              )}

              {isAuthenticated && (
                  <Route path="/get-order" element={<MyOrders />} exact />
              )}
          </Routes>
      </Router>
  );
}

export default App;
