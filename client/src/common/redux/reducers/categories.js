import {
  ADD_CATEGORY,
  CREATE_PRODUCT,
  FETCH_CATEGORIES,
  FETCH_PRODUCTS,
  REMOVE_CATEGORY,
  REMOVE_PRODUCT,
} from "../actions/actionTypes";

const initialState = {
  categoryName: "",
  actionType: "",
  categories: [],
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return {
        ...state,
        categoryName: action.data.category,
        actionType: action.data.actionType,
        categories: action.data,
      };
    case REMOVE_CATEGORY:
      return {
        ...state,
        categoryName: action.data.category,
        actionType: action.data.actionType,
        categories: action.data,
      };
    case FETCH_CATEGORIES:
    case CREATE_PRODUCT:
    case REMOVE_PRODUCT:
      return {
        ...state,
        categories: action.data,
      };
    default:
      return state;
  }
};

export default categoryReducer;
