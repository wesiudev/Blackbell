import { ADD_CATEGORY, AUTH, GET_ERROR, REMOVE_CATEGORY } from "./actionTypes";
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
  
  type CategoryAction = {
    userName: string
    category: string
    actionType: string
  }
  
  export const addCategory =
    (req: CategoryAction) =>
    async (dispatch: (arg0: { type: string; data?: any }) => void) => {
      try {
        const { data } = await api.addCategory(req);
        dispatch({ type: ADD_CATEGORY, data });
      } catch (error: any) {
        dispatch(getErrors(error.response.data.msg, GET_ERROR));
        setTimeout(() => {
          dispatch(clearErrors());
        }, 5000);
      }
    };
    
  export const removeCategory =
    (req: CategoryAction) =>
    async (dispatch: (arg0: { type: string; data?: any }) => void) => {
      try {
        const { data } = await api.removeCategory(req);
        dispatch({ type: REMOVE_CATEGORY, data });
      } catch (error: any) {
        dispatch(getErrors(error.response.data.msg, GET_ERROR));
        setTimeout(() => {
          dispatch(clearErrors());
        }, 5000);
      }
    };
  
