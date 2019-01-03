import React from "react"
import { Route, Switch } from 'react-router-dom'
import Tasks from "./components/Tasks.jsx"
import TaskDetails from "./components/TaskDetails.jsx"
import AddTask from "./components/AddTask.jsx"
import NotFound from "./components/NotFound.jsx"

const App = () => (
    <div className="application">
        <Switch>

            <Route path="/tasks/:id" exact component={TaskDetails} />
            <Route path="/add" component={AddTask} />
            <Route path="/" exact component={Tasks} />
            <Route component={NotFound} />
        </Switch>
        <Route path="/tasks" component={Tasks} />
    </div>)

export default App