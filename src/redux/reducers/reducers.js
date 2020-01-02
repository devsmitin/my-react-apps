import { ADD_TASK } from "../action-types/action-types";

const initialState = {
  // any initial state
  tasks: []
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_TASK) {
    // state.tasks.push(action.payload);
    return Object.assign({}, state, {
      tasks: state.tasks.concat(action.payload)
    });
  }
  return state;
  // resulting state is just a copy of the initial state
}

export default rootReducer;
