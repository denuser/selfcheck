import React from "react"
import { connect } from 'react-redux'
import * as actions from "./actions/todoAction"
import { bindActionCreators } from "redux";
import { BrowserRouter as Router, Route } from 'react-router-dom'

const AGpp = () => <div>AGPP</div>
const Rota = () => <div>Rota</div>

class App extends React.Component {
    componentDidMount() {
        this.props.ahah("HAHA")
    }

    render() {
        console.log(this.props.todo)
        return (
            <div>
                <Route path="/ahaa" component={AGpp} />
                <Route path="/" exact component={Rota} />
            </div>)
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        todo: state.default
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ahah: (test) => {
            //dispatch(actions.addTodo(test))
            dispatch({type: 'INCREMENT_ASYNC'})
        },
        todoActions: bindActionCreators(actions, dispatch),
    }
}

const FilterLink = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

export default FilterLink