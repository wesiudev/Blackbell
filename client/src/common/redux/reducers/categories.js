import { ADD_CATEGORY, REMOVE_CATEGORY } from "../actions/actionTypes";

const initialState = {
  userName: "",
  category: "",
  actionType: "",
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      localStorage.setItem("profile", JSON.stringify(action.data));
      return {
        ...state,
        userName: action.data.userName,
        category: action.data.category,
        actionType: action.data.actionType,
      };
    case REMOVE_CATEGORY:
      localStorage.setItem("profile", JSON.stringify(action.data));
      return {
        ...state,
        userName: action.data.userName,
        category: action.data.category,
        actionType: action.data.actionType,
      };
    default:
      return state;
  }
};

export default categoryReducer;
