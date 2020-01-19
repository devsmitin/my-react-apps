import { TOGGLE_NAV, TOGGLE_FORM, SET_VIEW } from ".";

// main reducer actions
export function toggleNav() {
  return { type: TOGGLE_NAV };
}

export function toggleForm() {
  return { type: TOGGLE_FORM };
}

export function setView(payload) {
  return { type: SET_VIEW, value: payload };
}
