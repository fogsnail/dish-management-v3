import { combineReducers } from "redux";
import showOrder from "./showOrder";
const appReducers = combineReducers({
  oder: showOrder,
});

export default appReducers;
