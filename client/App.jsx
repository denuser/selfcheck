import React from "react"
import { Route, Switch } from 'react-router-dom'
import Tasks from "./components/Tasks.jsx"
import NotFound from "./components/NotFound.jsx"

const App = () => (
    <div className="application">
        <Switch>
            <Route path="/tasks" component={Tasks} />
            <Route path="/" exact component={Tasks} />
            <Route component={NotFound} />
        </Switch>
    </div>)

export default App