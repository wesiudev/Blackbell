import {
  CREATE_PRODUCT,
  EDIT_PRODUCT,
  FETCH_PRODUCT,
  FETCH_PRODUCTS,
  REMOVE_PRODUCT,
} from "../actions/actionTypes";

const initialState = {
  products: [],
  product: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
    case REMOVE_PRODUCT:
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.data,
      };
    case FETCH_PRODUCT:
    case EDIT_PRODUCT:
      return {
        ...state,
        product: action.data,
      };
    default:
      return state;
  }
};

export default productReducer;
