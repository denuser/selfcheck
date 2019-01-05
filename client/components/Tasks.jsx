import React from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as tasksActions from "../actions/tasksActions"
import { Link } from "react-router-dom"
import styled from '@emotion/styled'

const Paper = styled.div({
    //width: '600px',
    backgroundColor: 'white',
    color: 'black',
    //borderRadius: '10px',
    padding: '15px',
    lineHeight: '1.5em',
    margin: '20px 0px',
    boxShadow:
        '0 1px 1px rgba(0,0,0,0.15), 0 10px 0 -5px #eee, 0 10px 1px -4px rgba(0,0,0,0.15), 0 20px 0 -10px #eee, 0 20px 1px -9px rgba(0,0,0,0.15)'
})

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
            return <Paper>{tasks.map((item, index) =>
                <div key={item._id}>{item.question} {item.answer}
                    <Link to={`/tasks/${item._id}`}>{item._id}</Link><hr /></div>)}</Paper>
        }
    }
}

const mapStateToProps = (state) => ({ tasks: state.tasks })

const mapDispatchToProps = (dispatch) => ({ tasksActions: bindActionCreators(tasksActions, dispatch) })

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)