import ReactDOM from "react-dom"
import React from "react"
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import rootReducer from './reducers'
import App from "./App.jsx"
import createSagaMiddleware from 'redux-saga'
const sagaMiddleware = createSagaMiddleware()
import rootSaga from './sagas'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    composeEnhancer(applyMiddleware(sagaMiddleware)),
    
)

sagaMiddleware.run(rootSaga)

const Root = () => (
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
)

ReactDOM.render(
    <Root />,
    document.getElementById('root'));