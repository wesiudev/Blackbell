import {
  CREATE_PRODUCT,
  FETCH_PRODUCT,
  FETCH_PRODUCTS,
  REMOVE_PRODUCT,
  EDIT_PRODUCT,
  CLEAN_PRODUCT,
  FETCHING_SINGLE_PRODUCT,
  END_FETCHING_SINGLE_PRODUCT,
} from "./actionTypes";
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

export const deleteProduct = (req) => async (dispatch) => {
  try {
    const { data } = await api.deleteProduct(req);
    dispatch({ type: REMOVE_PRODUCT, data });
  } catch (error) {
    dispatch(getMessages(error.response.data.msg, "ERROR"));
    setTimeout(() => {
      dispatch(clearMessages());
    }, 5000);
  }
};

export const editProduct = (req) => async (dispatch) => {
  try {
    dispatch({ type: FETCHING_SINGLE_PRODUCT });
    const { data } = await api.editProduct(req);
    dispatch({ type: EDIT_PRODUCT, data });
    dispatch({ type: END_FETCHING_SINGLE_PRODUCT });
  } catch (error) {
    dispatch(getMessages(error.response.data.msg, "ERROR"));
    setTimeout(() => {
      dispatch(clearMessages());
    }, 5000);
  }
};

export const fetchProducts = (req) => async (dispatch) => {
  try {
    const { data } = await api.fetchProducts(req);
    dispatch({ type: FETCH_PRODUCTS, data });
  } catch (error) {
    dispatch(getMessages(error.response.data.msg, "ERROR"));
    setTimeout(() => {
      dispatch(clearMessages());
    }, 5000);
  }
};
export const fetchProduct = (req) => async (dispatch) => {
  try {
    dispatch({ type: FETCHING_SINGLE_PRODUCT });
    const { data } = await api.fetchProduct(req);
    dispatch({ type: FETCH_PRODUCT, data });
    dispatch({ type: END_FETCHING_SINGLE_PRODUCT });
  } catch (error) {
    dispatch(getMessages(error.response.data.msg, "ERROR"));
    setTimeout(() => {
      dispatch(clearMessages());
    }, 5000);
  }
};
export const cleanProduct = (req) => async (dispatch) => {
  try {
    dispatch({ type: CLEAN_PRODUCT });
  } catch (error) {
    console.log(error);
  }
};
