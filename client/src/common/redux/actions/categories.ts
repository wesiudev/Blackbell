import { ADD_CATEGORY, GET_MESSAGES, REMOVE_CATEGORY, FETCH_CATEGORIES } from "./actionTypes";
import * as api from "../api";
import { clearMessages, getMessages } from "./messages";

type CategoryAction = {
    category: string
    actionType: string
  }
  
  export const addCategory =
    (req: CategoryAction) =>
    async (dispatch: (arg0: { type: string; data?: any }) => void) => {
      try {
        const { data } = await api.addCategory(req);
        dispatch({ type: ADD_CATEGORY, data });
        dispatch(getMessages(data.msg.text, data.msg.id));
        setTimeout(() => {
          dispatch(clearMessages());
        }, 5000);
      } catch (error: any) {
        dispatch(getMessages(error.response.data.msg, "ERROR"));
        setTimeout(() => {
          dispatch(clearMessages());
        }, 5000);
      }
    };
    
  export const removeCategory =
    (req: CategoryAction) =>
    async (dispatch: (arg0: { type: string; data?: any }) => void) => {
      try {
        const { data } = await api.removeCategory(req);
        dispatch({ type: REMOVE_CATEGORY, data });
        dispatch(getMessages(data.msg.text, data.msg.id));
        setTimeout(() => {
          dispatch(clearMessages());
        }, 5000);
      } catch (error: any) {
        dispatch(getMessages(error.response.data.msg, "ERROR"));
        setTimeout(() => {
          dispatch(clearMessages());
        }, 5000);
      }
    };

    export const getCategories =
    () =>
    async (dispatch: (arg0: { type: string; data?: any }) => void) => {
      try {
        const { data } = await api.fetchCategories();
        dispatch({ type: FETCH_CATEGORIES, data });
      } catch (error: any) {
        dispatch(getMessages(error.response.data.msg, "ERROR"));
        setTimeout(() => {
          dispatch(clearMessages());
        }, 5000);
      }
    };