import React from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as tasksActions from "../actions/tasksActions"
import { Link } from "react-router-dom"

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
            return <div style={{ border: "2px solid red" }}>{tasks.map((item, index) =>
                <div key={item._id}>{item.question} {item.answer} <Link to={`/tasks/${item._id}`}>{item._id}</Link></div>)}</div>
        }
    }
}

const mapStateToProps = (state) => ({ tasks: state.tasks })

const mapDispatchToProps = (dispatch) => ({ tasksActions: bindActionCreators(tasksActions, dispatch) })

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)