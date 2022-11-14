import {
  ADD_CATEGORY,
  FETCH_CATEGORIES,
  REMOVE_CATEGORY,
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
      return {
        ...state,
        categories: action.data,
      };
    default:
      return state;
  }
};

export default categoryReducer;
