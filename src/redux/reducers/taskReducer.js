import {
  ADD_TASK,
  DELETE_TASK,
  COMPLETE_TASK,
  INCOMPLETE_TASK
} from "../actionTypes";

const initialState = [];

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      console.log("action:", action);
      return state.concat([action.data]);

    case DELETE_TASK:
      console.log("action:", action);
      return state.filter(task => task.id !== action.id);

    case COMPLETE_TASK:
    case INCOMPLETE_TASK:
      console.log("action:", action);
      return state.map(task =>
        task.id === action.id
          ? { ...task, completed: !task.completed, updated: Date.now() }
          : task
      );

    default:
      return state;
  }
};
export default taskReducer;
