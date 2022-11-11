import { AUTH } from "../actions/actionTypes";

const initialState = {
  authData: localStorage.getItem("profile"),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify(action.data));
      return {
        ...state,
        authData: action.data,
      };
    default:
      return state;
  }
};

export default authReducer;
