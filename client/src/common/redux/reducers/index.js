import { combineReducers } from "redux";

import auth from "./auth";
import categories from "./categories";
import messages from "./messages";

export const reducers = combineReducers({
  auth,
  categories,
  messages,
});
