import { createStore } from "redux";
import reducer from "./reducers";

const store = createStore(reducer);

window.store = store;
console.log("STORE:", store.getState());

export default store;
