import { delay } from 'redux-saga'
import { put, takeEvery } from 'redux-saga/effects'
import { all } from 'redux-saga/effects'
import * as types from "../actions/types"
import fetch from "isomorphic-fetch"

export function* getTasks() {
    const response = yield fetch("/api/tasks")
    const tasks = yield response.json();
    yield put({ type: types.GET_TASKS_COMPLETE, tasks })
}

export function* addTask(payload) {
    const { question, answer } = payload
    try {
        const response = yield fetch("/api/tasks", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question, answer })
        })

        if (!response.ok) {
            const error = yield response.text()
            yield put({ type: types.ADD_TASK_FAILED, error })
        }
        else {
            const task = yield response.json();
            yield put({ type: types.ADD_TASK_COMPLETE, task })
        }
    }
    catch (error) {
        console.log(error)
        yield put({ type: types.ADD_TASK_FAILED, error })
    }
}

export function* watchGetTasks() {
    yield takeEvery(types.GET_TASKS, getTasks)
}

export function* watchAddTask() {
    yield takeEvery(types.ADD_TASK, addTask)
}

export default function* rootSaga() {
    yield all([
        watchGetTasks(),
        watchAddTask()
    ]);
}