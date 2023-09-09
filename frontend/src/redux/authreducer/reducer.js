import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./actiontype";

const intialState = {
    isError: false,
    isLoading: false,
    isAuth: false,
    userdata: {}
}

export const reducer = (state = intialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, isLoading: true, isError: false }
        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.token)
            return { ...state, isLoading: false, isError: false, isAuth: true }
        case LOGIN_FAILURE:
            return { ...state, isLoading: false, isError: true, isAuth: false }
        case REGISTER_REQUEST:
            return { ...state, isLoading: true, isError: false }
        case REGISTER_SUCCESS:
            return { ...state, isLoading: false, isError: false }
        case REGISTER_FAILURE:
            return { ...state, isLoading: false, isError: true }
        default:
            return state

    }
}