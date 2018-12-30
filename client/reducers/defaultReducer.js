import {
    ADD_TODO
} from './actions'


export default function todoApp(state = { text: "", completed: true, aha: "haha" }, action) {
    console.log("inside reducer")

    switch (action.type) {
        case ADD_TODO:
            return Object.assign({}, { ...state }, { text: action.text });
        default:
            return state
    }
}