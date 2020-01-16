import { ADD_TASK, DELETE_TASK, COMPLETE_TASK, INCOMPLETE_TASK } from "./actionTypes";

export function addTask(payload) {
  return { type: ADD_TASK, data: payload };
}

export function deleteTask(payload) {
  return { type: DELETE_TASK, id: payload };
}

export function completeTask(payload) {
  return { type: COMPLETE_TASK, id: payload };
}

export function incompleteTask(payload) {
  return { type: INCOMPLETE_TASK, id: payload };
}
