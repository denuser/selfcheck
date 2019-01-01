import * as types from '../actions/types'

export default function todoApp(state = { tasks: [], fetching: true }, action) {
    switch (action.type) {
        case types.GET_TASKS:
            return Object.assign({}, { ...state }, { fetching: true });
        case types.GET_TASKS_COMPLETE:
        debugger;
            const { tasks } = action;
            return Object.assign({}, { ...state }, { tasks, fetching: false });
        default:
            return state
    }
}