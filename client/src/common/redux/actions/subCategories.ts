import { ADD_SUBCATEGORY, FETCH_CATEGORIES, FETCH_SUBCATEGORIES, REMOVE_SUBCATEGORY } from "./actionTypes";
import * as api from "../api";
import { clearMessages, getMessages } from "./messages";

type ActionData = {
    category: string
    subCategory: string
    actionType: string
  }
  
  export const addSubCategory =
    (req: ActionData) =>
    async (dispatch: (arg0: { type: string; data?: any }) => void) => {
      try {
        const { data } = await api.addSubCategory(req);
        dispatch({ type: ADD_SUBCATEGORY, data });
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
    
  export const removeSubCategory =
    (req: ActionData) =>
    async (dispatch: (arg0: { type: string; data?: any }) => void) => {
      try {
        const { data } = await api.removeSubCategory(req);
        dispatch({ type: REMOVE_SUBCATEGORY, data });
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

    export const getSubCategories =
    () =>
    async (dispatch: (arg0: { type: string; data?: any }) => void) => {
      try {
        const { data } = await api.fetchSubCategories();
        dispatch({ type: FETCH_SUBCATEGORIES, data });
      } catch (error: any) {
        dispatch(getMessages(error.response.data.msg, "ERROR"));
        setTimeout(() => {
          dispatch(clearMessages());
        }, 5000);
      }
    };