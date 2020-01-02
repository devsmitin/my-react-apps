import { ADD_TASK } from "../action-types/action-types";

export function addTask(payload) {
  return { type: ADD_TASK, payload };
}
