import { AUTH, GET_ERROR } from "./actionTypes";
import * as api from "../api";
import { clearErrors, getErrors } from "./error";

interface UserInput {
  userName:string
  password:string
}

export const signInAdmin =
  (userInput: UserInput) =>
  async (dispatch: (arg0: { type: string; data?: any }) => void) => {
    try {
      const { data } = await api.signInAdmin(userInput);
      dispatch({ type: AUTH, data });
    } catch (error: any) {
      dispatch(getErrors(error.response.data.msg, GET_ERROR));
      setTimeout(() => {
        dispatch(clearErrors());
      }, 5000);
    }
  };

  

  
