import { CLEAR_MESSAGES, GET_MESSAGES } from "./actionTypes";

export const getMessages = (text: string, id: string) => {
  return {
    type: GET_MESSAGES,
    data: { text, id },
  };
};

export const clearMessages = () => {
  return {
    type: CLEAR_MESSAGES,
  };
};
