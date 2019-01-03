import { makeActionCreator } from "../utility/makeActionCreator"
import * as types from "./types"

export const getTasks = makeActionCreator(types.GET_TASKS)
export const addTask = makeActionCreator(types.ADD_TASK, 'question', 'answer')
export const getTask = makeActionCreator(types.GET_TASK, 'id')
export const addTaskFailed = makeActionCreator(types.ADD_TASK_FAILED, 'error')