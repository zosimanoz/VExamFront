import React from 'react'

import { Bootstrap, Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem, Panel } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
// import AddDepartment from './add-department.component';
import QuestionCategoryList from './questionCategory-list.component';


import { fetchQuestionCategoryList } from '../../actions/questionCategory.action';

class QuestionCategoriesIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchQuestionCategoryList();
    }

    render() {
        return (
            <Panel header={this.props.heading}>
                <form id="form-list-client">
                    <div className="pull-right">
                        <NavLink exact to="/admin/categories/add" className="btn btn-primary btn-sm"><i className="glyphicon glyphicon-plus"></i>Add Category</NavLink>
                    </div>

                    <QuestionCategoryList questionCategories={this.props.questionCategories} />

                </form>
            </Panel>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        questionCategories: state.questionCategories
    }
}

export default connect(mapStateToProps, { fetchQuestionCategoryList })(QuestionCategoriesIndex);