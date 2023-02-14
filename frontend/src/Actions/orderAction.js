import axios from "axios";

export const OrderItems = (sub_total, phoneNumber) => async (dispatch) => {
    try {
        dispatch({
            type: 'createOrderRequest',
        });

        const { data } = await axios.post(
            `/api/v1/add-order`,
            { sub_total, phoneNumber },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        
        dispatch({
            type: 'createOrderSuccess',
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: 'createOrderFailure',
            payload: error.response.data.message,
        });
    }
};

export const myOrders = () => async (dispatch) => {
    try {
        dispatch({ type: 'myOrderRequest' });

        const { data } = await axios.get(`/api/v1/get-order`);

        dispatch({ type: 'myOrderSuccess', payload: data.orders });
    } catch (error) {
        dispatch({
            type: 'myOrderFailure',
            payload: error.response.data.message,
        });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: 'ClearErrors' });
};