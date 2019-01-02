import * as types from '../actions/types'

export default function todoApp(state = { tasks: [], fetching: true }, action) {
    switch (action.type) {
        case types.GET_TASKS:
            return Object.assign({}, { ...state }, { fetching: true });
        case types.GET_TASKS_COMPLETE:
            const { tasks } = action;
            return Object.assign({}, { ...state }, { tasks, fetching: false });
        case types.ADD_TASK_FAILED:
            const { error } = action;
            return Object.assign({}, { ...state }, { error, fetching: false });
        default:
            return state
    }
}