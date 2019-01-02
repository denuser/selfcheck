import React from "react"
import { dispatch } from "redux"
import { connect } from "react-redux"
import * as actions from "../actions/tasksActions"

class AddTask extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = { question: "", answer: "" }
    }

    handleSubmit(e) {
        console.log(this.state)
        const { question, answer } = this.state;
        this.props.addTask(question, answer)
        e.preventDefault();
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        return <form onSubmit={this.handleSubmit}>
            <textarea className="question" name="question"
                value={this.state.question}
                onChange={this.handleChange} />
            <textarea className="answer" name="answer"
                value={this.state.answer}
                onChange={this.handleChange} />
            <input type="submit" value="Submit" />
        </form>
    }
}
const mapDispatchToProps = (dispatch) => ({
    addTask: (question, answer) => dispatch(actions.addTask(question, answer))
})

export default connect(null, mapDispatchToProps)(AddTask)