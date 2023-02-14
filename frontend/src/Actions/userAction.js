import axios from 'axios';

export const registerUser =
    (name, phoneNumber, password) => async (dispatch) => {
        try {
            dispatch({
                type: 'RegisterRequest',
            });

            const { data } = await axios.post(
                `/api/v1/add-user`,
                { name, phoneNumber, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            dispatch({
                type: 'RegisterSuccess',
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: 'RegisterFailure',
                payload: error.response.data.message,
            });
        }
    };

export const loginUser = (phoneNumber, password) => async (dispatch) => {
    try {
        dispatch({ type: 'LoginRequest' });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const { data } = await axios.post(
            `/api/v1/login-user`,
            { phoneNumber, password },
            {
                config
            }
        );

        dispatch({
            type: 'LoginSuccess',
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: 'LoginFailure',
            payload: error.response.data.message,
        });
    }
};

export const logoutUser = () => async (dispatch) => {
    try {
        dispatch({ type: 'LogoutUserRequest' });

        await axios.get('/api/v1/logout-user');

        dispatch({ type: 'LogoutUserSuccess' });
    } catch (error) {
        dispatch({
            type: 'LogoutUserFailure',
            payload: error.response.data.message,
        });
    }
};

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: 'LoadUserRequest',
        });

        const { data } = await axios.get('/api/v1/me');

        dispatch({
            type: 'LoadUserSuccess',
            payload: data.user,
        });
    } catch (error) {
        dispatch({
            type: 'LoadUserFailure',
            payload: error.response.data.message,
        });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: 'ClearErrors' });
};
