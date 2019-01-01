import { delay } from 'redux-saga'
import { put, takeEvery } from 'redux-saga/effects'
import { all } from 'redux-saga/effects'
import * as types from "../actions/types"
import fetch from "isomorphic-fetch"

export function* getTasks() {
    yield delay(2000)
    const response = yield fetch("/api/tasks")
    const tasks = yield response.json();
    yield put({ type: types.GET_TASKS_COMPLETE, tasks })
}

export function* watchGetTasks() {
    yield takeEvery(types.GET_TASKS, getTasks)
}

export default function* rootSaga() {
    yield all([
        watchGetTasks()
    ]);
}