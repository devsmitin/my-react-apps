import { combineReducers } from "redux";

import taskReducer from "./taskReducer";
import mainReducer from "./mainReducer";

export default combineReducers({
  tasks: taskReducer,
  layout: mainReducer
});
