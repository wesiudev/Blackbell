import { AUTH, GET_MESSAGES, OWNER_AUTH } from "./actionTypes";
import * as api from "../api";
import { clearMessages, getMessages } from "./messages";

interface UserInput {
  userName:string
  password:string
}

export const signInAdmin =
  (userInput: UserInput) =>
  async (dispatch: (arg0: { type: string; data?: any }) => void) => {
    try {
      const { data } = await api.signInAdmin(userInput);
      dispatch({ type: OWNER_AUTH, data });
    } catch (error: any) {
      dispatch(getMessages(error.response.data.msg, GET_MESSAGES));
      setTimeout(() => {
        dispatch(clearMessages());
      }, 5000);
    }
  };

  

  
