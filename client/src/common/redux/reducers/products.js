import {
  CREATE_PRODUCT,
  EDIT_PRODUCT,
  FETCH_PRODUCT,
  FETCH_PRODUCTS,
  REMOVE_PRODUCT,
  CLEAN_PRODUCT,
  FETCHING_SINGLE_PRODUCT,
  END_FETCHING_SINGLE_PRODUCT,
} from "../actions/actionTypes";

const initialState = {
  products: [],
  product: {},
  fetchingSingleProduct: false,
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
      return {
        ...state,
        product: action.data,
      };
    case EDIT_PRODUCT:
      return {
        ...state,
        product: action.data.updatedProduct,
      };
    case CLEAN_PRODUCT:
      return {
        ...state,
        product: {},
      };
    case FETCHING_SINGLE_PRODUCT:
      return {
        ...state,
        fetchingSingleProduct: true,
      };
    case END_FETCHING_SINGLE_PRODUCT:
      return {
        ...state,
        fetchingSingleProduct: false,
      };
    default:
      return state;
  }
};

export default productReducer;
