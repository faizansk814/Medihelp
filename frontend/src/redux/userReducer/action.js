import {
  PRODUCT_FAILURE,
  PRODUCT_SUCCESS,
  PRODUCT_REQUEST,
  CATEGORY_REQUEST,
  CATEGORY_SUCCESS,
  CATEGORY_FAILURE,
  PARTICULAR_REQUEST,
  PARTICULAR_SUCCESS,
  PARTICULAR_FAILURE,
  ADD_CART_REQUEST,
  ADD_CART_SUCCESS,
  ADD_CART_FAILURE,
  CART_REQUEST,
  CART_SUCCESS,
  CART_FAILURE,
  INC_REQUEST,
  INC_SUCCESS,
  INC_FAILURE,
  DEC_REQUEST,
  DEC_SUCCESS,
  DEC_FAILURE,
} from "./actiontype";

import axios from "axios";
const url = "https://medhelp.onrender.com";

export const getProductData = (page) => (dispatch) => {
  dispatch({ type: PRODUCT_REQUEST });
  axios
    .get(`${url}/product/paginate?page=${page}&limit=6`)
    .then((res) => {
      dispatch({ type: PRODUCT_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: PRODUCT_FAILURE });
    });
};

export const filter = (category) => async (dispatch) => {
  dispatch({ type: CATEGORY_REQUEST });
  try {
    let res = await axios.get(`${url}/product/filter?category=${category}`);
    dispatch({ type: CATEGORY_SUCCESS, payload: res.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: CATEGORY_FAILURE });
  }
};

export const ParticularProduct = (id) => async (dispatch) => {
  dispatch({ type: PARTICULAR_REQUEST });
  try {
    const res = await axios.get(`${url}/product/part/${id}`);
    dispatch({ type: PARTICULAR_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: PARTICULAR_FAILURE });
  }
};

export const AddToCart = (id, token) => async (dispatch) => {
  dispatch({ type: ADD_CART_REQUEST });
  try {
    const res = await axios.post(`${url}/cart/add/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: ADD_CART_SUCCESS });
    return res.data;
  } catch (error) {
    dispatch({ type: ADD_CART_FAILURE });
    return error.response.data;
  }
};

export const CartGet = (token) => async (dispatch) => {
  dispatch({ type: CART_REQUEST });
  try {
    const res = await axios.get(`${url}/cart/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: CART_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: CART_FAILURE });
  }
};

export const Incr = (token, id) => async (dispatch) => {
  dispatch({ type: INC_REQUEST });
  try {
    const res = await axios.patch(`${url}/cart/inc/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: INC_SUCCESS });
    return res.data;
  } catch (error) {
    dispatch({ type: INC_FAILURE });
    return error.response.data
  }
};

export const Dec = (token, id) => async (dispatch) => {
  dispatch({ type: DEC_REQUEST });
  try {
    const res = await axios.patch(`${url}/cart/dec/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: DEC_SUCCESS });
    return res.data;
  } catch (error) {
    dispatch({ type: DEC_FAILURE });
    return error.response.data
  }
};
