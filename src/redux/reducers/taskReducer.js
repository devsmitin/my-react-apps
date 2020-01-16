import { ADD_TASK, DELETE_TASK, COMPLETE_TASK } from "../actionTypes";

const initialState = [];

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return state.concat([action.data]);

    case DELETE_TASK:
      return state.filter(task => task.id !== action.id);

    case COMPLETE_TASK:
      return state.map(task =>
        task.id === action.id ? { ...task, completed: !task.completed } : task
      );

    default:
      return state;
  }
};
export default taskReducer;
