import { CREATE_PRODUCT, REMOVE_PRODUCT } from "../actions/actionTypes";

const initialState = {
  categories: [],
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
    case REMOVE_PRODUCT:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default itemReducer;
