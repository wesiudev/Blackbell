import { ADD_CATEGORY, GET_ERROR, REMOVE_CATEGORY, FETCH_CATEGORIES } from "./actionTypes";
import * as api from "../api";
import { clearErrors, getErrors } from "./error";

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

    export const getCategories =
    () =>
    async (dispatch: (arg0: { type: string; data?: any }) => void) => {
      try {
        const { data } = await api.fetchCategories();
        dispatch({ type: FETCH_CATEGORIES, data });
      } catch (error: any) {
        dispatch(getErrors(error.response.data.msg, GET_ERROR));
        setTimeout(() => {
          dispatch(clearErrors());
        }, 5000);
      }
    };