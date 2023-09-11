import {
  ADD_CART_FAILURE,
  ADD_CART_REQUEST,
  ADD_CART_SUCCESS,
  CART_FAILURE,
  CART_REQUEST,
  CART_SUCCESS,
  CATEGORY_FAILURE,
  CATEGORY_REQUEST,
  CATEGORY_SUCCESS,
  DEC_FAILURE,
  DEC_REQUEST,
  DEC_SUCCESS,
  INC_FAILURE,
  INC_REQUEST,
  INC_SUCCESS,
  PARTICULAR_FAILURE,
  PARTICULAR_REQUEST,
  PARTICULAR_SUCCESS,
  PRODUCT_FAILURE,
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
} from "./actiontype";

const intialState = {
  data: [],
  isError: false,
  isLoading: false,
  product: {},
  cart: [],
};

export const reducer = (state = intialState, action) => {
  switch (action.type) {
    case PRODUCT_REQUEST:
      return { ...state, isLoading: true, isError: false };
    case PRODUCT_SUCCESS:
      localStorage.setItem("length", Math.ceil(35 / 6));
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case PRODUCT_FAILURE:
      return { ...state, isLoading: false, isError: true };
    case CATEGORY_REQUEST:
      return { ...state, isLoading: true, isError: false };
    case CATEGORY_SUCCESS:
      localStorage.setItem("length", Math.ceil(action.payload.length / 6));
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        isError: false,
      };
    case CATEGORY_FAILURE:
      return { ...state, isLoading: false, isError: true };
    case PARTICULAR_REQUEST:
      return { ...state, isLoading: true, isError: false };
    case PARTICULAR_SUCCESS:
      return { ...state, isLoading: false, product: action.payload };
    case PARTICULAR_FAILURE:
      return { ...state, isLoading: false, isError: true };
    case ADD_CART_REQUEST:
      return { ...state, isLoading: true, isError: false };
    case ADD_CART_SUCCESS:
      return { ...state, isLoading: false, isError: false };
    case ADD_CART_FAILURE:
      return { ...state, isLoading: false, isError: true };
    case CART_REQUEST:
      return { ...state, isLoading: true, isError: false };
    case CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        cart: action.payload,
      };
    case CART_FAILURE:
      return { ...state, isLoading: false, isError: true };
    case INC_REQUEST:
      return { ...state, isLoading: true, isError: false };
    case INC_SUCCESS:
      return { ...state, isLoading: false, isError: false };
    case INC_FAILURE:
      return { ...state, isLoading: false, isError: true };
    case DEC_REQUEST:
      return { ...state, isLoading: true, isError: false };
    case DEC_SUCCESS:
      return { ...state, isLoading: false, isError: false };
    case DEC_FAILURE:
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};
