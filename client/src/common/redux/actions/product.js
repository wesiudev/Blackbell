import { CREATE_PRODUCT, GET_MESSAGES, REMOVE_PRODUCT } from "./actionTypes";
import * as api from "../api";
import { clearMessages, getMessages } from "./messages";

export const addProduct = (req) => async (dispatch) => {
  try {
    const { data } = await api.addProduct(req);
    dispatch({ type: CREATE_PRODUCT, data });
    dispatch(getMessages(data.msg.text, data.msg.id));
    setTimeout(() => {
      dispatch(clearMessages());
    }, 5000);
  } catch (error) {
    dispatch(getMessages(error.response.data.msg, "ERROR"));
    setTimeout(() => {
      dispatch(clearMessages());
    }, 5000);
  }
};

export const removeCategory = (req) => async (dispatch) => {
  try {
    const { data } = await api.removeCategory(req);
    dispatch({ type: REMOVE_PRODUCT, data });
  } catch (error) {
    dispatch(getMessages(error.response.data.msg, "ERROR"));
    setTimeout(() => {
      dispatch(clearMessages());
    }, 5000);
  }
};
