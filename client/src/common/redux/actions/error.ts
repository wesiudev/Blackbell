import { CLEAR_ERRORS, GET_ERROR } from "./actionTypes";

export const getErrors = (msg: string, id: string) => {
  return {
    type: GET_ERROR,
    data: { msg, id },
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
