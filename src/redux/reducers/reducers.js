import { ADD_TASK } from "../action-types/action-types";

const initialState = {
  // any initial state
  tasks: []
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_TASK) {
    // state.tasks.push(action.payload);
    // return Object.assign({}, state, {
    //   tasks: state.tasks.concat(action.payload)
    // });
    let tasks = state.tasks;
    console.log("1", tasks);
    tasks.push(action.payload);
    console.log("2", tasks);
    return { tasks };
  }
  return state;
  // resulting state is just a copy of the initial state
}

export default rootReducer;
