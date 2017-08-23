import React from 'react'

import { Bootstrap, Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem, Panel } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
// import AddDepartment from './add-department.component';
import QuestionComplexityList from './questionComplexity-list.component';


import { fetchQuestionComplexityList } from '../../actions/questionComplexity.action';

class QuestionComplexityIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchQuestionComplexityList();
    }

    render() {
        return (
            <Panel header={this.props.heading}>
                <form id="form-list-client">
                    <div className="pull-right">
                        <NavLink exact to="/admin/complexity/add" className="btn btn-primary btn-sm"><i className="glyphicon glyphicon-plus"></i>Add Complexity</NavLink>
                    </div>

                    <QuestionComplexityList questionComplexities={this.props.questionComplexities} />

                </form>
            </Panel>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        questionComplexities: state.questionComplexities
    }
}

export default connect(mapStateToProps, { fetchQuestionComplexityList })(QuestionComplexityIndex);