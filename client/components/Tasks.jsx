import React from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as tasksActions from "../actions/tasksActions"

class Tasks extends React.Component {
    componentDidMount() {
        this.props.tasksActions.getTasks();
    }

    render() {
        const { tasks, fetching } = this.props.tasks;
        if (fetching) {
            return <div>Fetching...</div>
        }
        else {
            return <div>{tasks.map((item, index) => <div key={index}>{item}</div>)}</div>
        }
    }
}

const mapStateToProps = (state) => ({ tasks: state.tasks })

const mapDispatchToProps = (dispatch) => ({ tasksActions: bindActionCreators(tasksActions, dispatch) })

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)