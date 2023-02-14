import './MyOrders.css';

import Typography from '@material-ui/core/Typography';
import { DataGrid } from '@material-ui/data-grid';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

import { myOrders, clearErrors } from '../../Actions/orderAction';

const MyOrders = () => {
    const dispatch = useDispatch();
    const {id} = useParams();

    const { error } = useSelector((state) => state.myOrder);
    const { user } = useSelector((state) => state.user);

    const columns = [
        { field: 'id', headerName: 'User ID', minWidth: 100, flex: 0.5 },
        {
            field: 'sub_total',
            headerName: 'Sub Total',
            type: 'number',
            minWidth: 100,
            flex: 0.5,
        },
        {
            field: 'phoneNumber',
            headerName: 'Phone Number',
            type: 'phonenumber',
            minWidth: 100,
            flex: 0.5,
        },
    ];

    const rows = [];


    user.orders &&
        user.orders.forEach((item) => {
            rows.push({
                id: item._id,
                sub_total: item.sub_total,
                phoneNumber: item.phoneNumber,
            });
        });

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        dispatch(myOrders());
    }, [dispatch, error]);

    return (
        <Fragment>
            <div className="myOrdersPage">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    disableSelectionOnClick
                    className="myOrdersTable"
                    autoHeight
                />

                <Typography id="myOrdersHeading">
                    {user.name}'s Orders
                </Typography>
            </div>
        </Fragment>
    );
};

export default MyOrders;
