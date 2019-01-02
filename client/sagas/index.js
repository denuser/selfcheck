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
    yield delay(2000)
    const { question, answer } = payload
    console.info(question, answer)
    // const response = yield fetch("/api/tasks",)
    // const task = yield response.json();
    yield put({ type: types.ADD_TASK_COMPLETE, task: {} })
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