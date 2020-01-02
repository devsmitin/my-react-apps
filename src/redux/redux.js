import store from "./store/store";
import { addTask } from "./actions/actions";

window.store = store;
window.addTask = addTask;

/*
store.getState();
store.subscribe(() => console.log("State Updated!!"));
store.dispatch(addTask({ title: "Task Title", description: "Some task description added" }));
*/
