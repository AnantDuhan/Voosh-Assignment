import { Typography, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './AddOrder.css';
import { OrderItems } from '../../Actions/orderAction';
import { toast } from 'react-toastify';

const Order = () => {
    const [subTotal, setSubTotal] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState('');

    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.order);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(OrderItems(subTotal, phoneNumber));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearErrors' });
        }
    }, [dispatch, error]);
    return (
        <div className="order">
            <form className="orderForm" onSubmit={submitHandler}>
                <Typography variant="h3" style={{ padding: '2vmax' }}>
                    ORDER NOW
                </Typography>

                <input
                    type="number"
                    value={subTotal}
                    placeholder="Sub Total"
                    className="orderInputs"
                    required
                    onChange={(e) => setSubTotal(e.target.value)}
                />

                <input
                    type="phone number"
                    placeholder="Phone Number"
                    className="orderInputs"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />

                <Button type="submit">ORDER</Button>
            </form>
        </div>
    );
};

export default Order;
