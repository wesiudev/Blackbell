import { GET_ERROR, CLEAR_ERRORS } from "../actions/actionTypes";

const errorReducer = (
  state = { msg: null, id: null },
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case GET_ERROR:
      return {
        ...state,
        msg: action.data.msg,
        id: action.data.id,
      };
    case CLEAR_ERRORS:
      return {
        msg: null,
        id: null,
      };
    default:
      return state;
  }
};

export default errorReducer;
