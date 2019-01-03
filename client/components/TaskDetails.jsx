import React from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as tasksActions from "../actions/tasksActions"

class TaskDetails extends React.Component {
    componentDidMount() {
        this.props.tasksActions.getTask(this.props.match.params.id);
    }

    componentDidUpdate({ match: { params: { id } } }) {
        const { id: nextId } = this.props.match.params;
        if (nextId !== id) {
            this.props.tasksActions.getTask(this.props.match.params.id);
        }
    }

    render() {
        const { task, fetching } = this.props.tasks;
        if (fetching || !task) {
            return <div>Fetching...</div>
        }
        else {
            return <div>{task.question} {task.answer} {task._id}</div>
        }
    }
}

const mapStateToProps = (state) => ({ tasks: state.tasks })

const mapDispatchToProps = (dispatch) => ({ tasksActions: bindActionCreators(tasksActions, dispatch) })

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails)