import { GET_MESSAGES, CLEAR_MESSAGES } from "../actions/actionTypes";

const errorReducer = (
  state = { text: null, id: null },
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        ...state,
        text: action.data.text,
        id: action.data.id,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        text: null,
        id: null,
      };
    default:
      return state;
  }
};

export default errorReducer;
