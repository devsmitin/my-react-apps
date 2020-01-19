import { combineReducers } from "redux";

import taskReducer from "./taskReducer";
import layoutReducer from "./layoutReducer";

export default combineReducers({
  tasks: taskReducer,
  layout: layoutReducer
});
