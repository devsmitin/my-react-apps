const postReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TASK":
      return state.concat([action.data]);
    case "DELETE_TASK":
      return state.filter(post => post.id !== action.id);
    case "COMPLETE_TASK":
      // return state.filter(post => post.id !== action.id);
      return state.map(post =>
        post.id === action.id ? { ...post, completed: !post.completed } : post
      );

    default:
      return state;
  }
};
export default postReducer;
