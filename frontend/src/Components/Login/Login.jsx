import React, { Fragment, useState, useEffect } from 'react'
import { Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearErrors } from '../../Actions/userAction';
import { toast } from 'react-toastify';
import './Login.css';

const Login = () => {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isAuthenticated } = useSelector((state) => state.user);

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(phoneNumber, password));
  }

  useEffect(() => {
      if (error) {
          toast.error(error);
          dispatch(clearErrors());
      }
      if (isAuthenticated) {
          toast.success('Logged In Successfully');
          navigate('/add-order');
      }
  }, [dispatch, error, isAuthenticated, navigate]);

  return (
      <Fragment>
          <div className="login">
              <form className="loginForm" onSubmit={loginSubmit}>
                  <Typography variant="h4" style={{ padding: '2vmax' }}>
                      LOGIN
                  </Typography>

                  <input
                      type="number"
                      placeholder="Phone Number"
                      className="loginInputs"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                  />

                  <input
                      type="password"
                      className="loginInputs"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />

                  <Link to="/add-user">
                      <Typography>New User?</Typography>
                  </Link>

                  <Button type="submit">LOGIN</Button>
              </form>
          </div>
      </Fragment>
  );
}

export default Login