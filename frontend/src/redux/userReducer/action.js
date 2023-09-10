import {
  PRODUCT_FAILURE,
  PRODUCT_SUCCESS,
  PRODUCT_REQUEST,
  CATEGORY_REQUEST,
  CATEGORY_SUCCESS,
  CATEGORY_FAILURE,
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

export const filter=(category)=>async (dispatch)=>{
  dispatch({type:CATEGORY_REQUEST})
  try {
    let res=await axios.get(`${url}/product/filter?category=${category}`)
    dispatch({type:CATEGORY_SUCCESS,payload:res.data})
  } catch (error) {
    console.log(error)
    dispatch({type:CATEGORY_FAILURE})
  }



}
