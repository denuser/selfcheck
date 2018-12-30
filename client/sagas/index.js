import { delay } from 'redux-saga'
import { put, takeEvery } from 'redux-saga/effects'
import {all} from 'redux-saga/effects'

export function* helloSaga() {
    console.log('Hello Sagas!')
}

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
    yield delay(1000)
    console.log("After delay")
    yield put({ type: 'INCREMENT' })
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

export default function* rootSaga() {
    yield all([
        helloSaga(),
        watchIncrementAsync()
    ]);
}