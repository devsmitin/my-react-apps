import { createStore } from "redux";
import rootReducer from "../reducers/reducers";

const store = createStore(rootReducer);
// createStore takes a reducer as the first argument
// state in Redux comes from reducers

export default store;
