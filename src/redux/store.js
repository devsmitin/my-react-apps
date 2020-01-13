import { createStore } from "redux";
import rootReducer from "./reducers/taskReducer";

const store = createStore(rootReducer);

export default store;
