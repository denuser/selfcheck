import { ADD_TODO } from "../reducers/actions"

export const addTodo = (text) => {

    return { type: ADD_TODO, text }
}