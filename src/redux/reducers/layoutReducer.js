import { TOGGLE_NAV, TOGGLE_FORM, SET_VIEW } from "../actions";

const initialState = {
  navToggled: false,
  formVisible: false,
  viewType: 1
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_NAV:
      console.log("action:", action);
      return (state.navToggled = !state.navToggled);

    case TOGGLE_FORM:
      console.log("action:", action);
      return (state = { ...state, formVisible: !state.formVisible });

    case SET_VIEW:
      console.log("action:", action);
      return (state = { ...state, viewType: action.value });

    default:
      return state;
  }
};
export default mainReducer;
