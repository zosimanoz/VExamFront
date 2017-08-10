import React from 'react'

import { Bootstrap, Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem, Panel } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';

import AddQuestion from './add-question.component';
import QustionsList from './question-list.component';


import { fetchQuestions, deleteQuestion } from '../../actions/questions.action';


class QuestionsIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchQuestions();
    }

    render() {
        return (
            <Panel header={this.props.heading}>
                <form id="form-list-client">


                    <div className="pull-right">
                        <NavLink exact to="/admin/questions/add" className="btn btn-primary btn-sm"><i className="glyphicon glyphicon-plus"></i>Add Question</NavLink>
                    </div>

                    <QustionsList questions={this.props.questions} deleteQuestion = {this.props.deleteQuestion}/>

                </form>
            </Panel>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        questions: state.questions
    }
}

export default connect(mapStateToProps, { fetchQuestions, deleteQuestion })(QuestionsIndex);