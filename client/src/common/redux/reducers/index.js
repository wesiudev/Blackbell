import { combineReducers } from "redux";

import auth from "./auth";
import categories from "./categories";
import error from "./error";

export const reducers = combineReducers({
  auth,
  categories,
  error,
});
