import { combineReducers } from "redux";

import auth from "./auth";
import categories from "./categories";
import subCategories from "./subCategories";
import messages from "./messages";
import products from "./products";

export const reducers = combineReducers({
  auth,
  categories,
  subCategories,
  messages,
  products,
});
