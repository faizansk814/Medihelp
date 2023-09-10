import {
  CATEGORY_FAILURE,
  CATEGORY_REQUEST,
  CATEGORY_SUCCESS,
  PRODUCT_FAILURE,
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
} from "./actiontype";

const intialState = {
  data: [],
  isError: false,
  isLoading: false,
};

export const reducer = (state = intialState, action) => {
  switch (action.type) {
    case PRODUCT_REQUEST:
      return { ...state, isLoading: true, isError: false };
    case PRODUCT_SUCCESS:
      localStorage.setItem("length",Math.ceil(35/6))
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case PRODUCT_FAILURE:
      return { ...state, isLoading: false, isError: true };
    
    case CATEGORY_REQUEST:
      return {...state,isLoading:true,isError:false};
    
    case CATEGORY_SUCCESS:
      localStorage.setItem("length",Math.ceil(action.payload.length/6))
      return {...state,isLoading:false,data:action.payload,isError:false};

    case CATEGORY_FAILURE:
      return {...state,isLoading:false,isError:true}
    default:
      return state;
  }
};
