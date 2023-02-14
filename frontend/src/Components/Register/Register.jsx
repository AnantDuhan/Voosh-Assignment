import { Typography, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import { registerUser } from '../../Actions/userAction';
import { toast } from 'react-toastify';

const Register = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, isAuthenticated } = useSelector((state) => state.user);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(registerUser(name, phoneNumber, password));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearErrors' });
        }
        if (isAuthenticated) {
          toast.success('Registered Successfully');
          navigate('/login-user');
        }
    }, [dispatch, error, isAuthenticated, navigate]);
    return (
        <div className="register">
            <form className="registerForm" onSubmit={submitHandler}>
                <Typography variant="h3" style={{ padding: '2vmax' }}>
                    Register
                </Typography>

                <input
                    type="text"
                    value={name}
                    placeholder="Name"
                    className="registerInputs"
                    required
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="phone number"
                    placeholder="Phone Number"
                    className="registerInputs"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />

                <input
                    type="password"
                    className="registerInputs"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Link to="/login-user">
                    <Typography>Already Signed Up? Login Now</Typography>
                </Link>

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
};

export default Register;
