import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./actiontype";
import axios from "axios";
const url = 'https://medhelp.onrender.com'
export const LoginUser = (body) => (dispatch) => {
    dispatch({ type: LOGIN_REQUEST })
    return axios.post(`${url}/user/login`, body)
        .then((res) => {
            if (res.status === 200) {
                dispatch({ type: LOGIN_SUCCESS, payload: res.data })
                return res.data
            }
        })
        .catch((err) => {
            if (err.response && err.response.status === 401) {
                const errorResponseData = err.response.data;
                dispatch({ type: LOGIN_FAILURE });
                return errorResponseData
            }
            dispatch({ type: LOGIN_FAILURE })
        })
}

export const RegisterUser = (body) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST })
        const res = await axios.post(`${url}/user/register`, body)
        dispatch({ type: REGISTER_SUCCESS })
        return res.data
    } catch (error) {
        console.log(error)
        dispatch({type:REGISTER_FAILURE})
        return error.response.data

    }
}