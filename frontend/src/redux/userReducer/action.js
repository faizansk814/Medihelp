import {
  PRODUCT_FAILURE,
  PRODUCT_SUCCESS,
  PRODUCT_REQUEST,
} from "./actiontype";

import axios from "axios";
const url = "https://medhelp.onrender.com";

export const getProductData = () => (dispatch) => {
  dispatch({ type: PRODUCT_REQUEST });
  axios
    .get(`${url}/product/get`)
    .then((res) => {
      dispatch({ type: PRODUCT_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: PRODUCT_FAILURE });
    });
};
