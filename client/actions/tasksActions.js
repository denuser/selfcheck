import { makeActionCreator } from "../utility/makeActionCreator"
import * as types from "./types"

export const getTasks = makeActionCreator(types.GET_TASKS)