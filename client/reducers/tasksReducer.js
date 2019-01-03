import * as types from '../actions/types'

export default function todoApp(state = { tasks: [], task: null, fetching: true }, action) {
    switch (action.type) {
        case types.GET_TASKS:
        case types.GET_TASK:
            return Object.assign({}, { ...state }, { fetching: true });

        case types.GET_TASKS_COMPLETE:
            const { tasks } = action;
            return Object.assign({}, { ...state }, { tasks, fetching: false });

        case types.GET_TASK_COMPLETE:
            const { task } = action;
            return Object.assign({}, { ...state }, { task, fetching: false });

        case types.ADD_TASK_FAILED:
            const { error } = action;
            return Object.assign({}, { ...state }, { error, fetching: false });

        default:
            return state
    }
}