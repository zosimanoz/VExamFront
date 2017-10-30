import React from 'react'

import { Bootstrap, Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem, Panel } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
// import AddDepartment from './add-department.component';
import QuestionCategoryList from './questionCategory-list.component';
import Loader from '../loader/loader.component';


import { fetchQuestionCategoryList, deleteQuestionCategory } from '../../actions/questionCategory.action';

class QuestionCategoriesIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchQuestionCategoryList();
    }
    state = {
        loading: false,
        done: false
    }

    deleteQuestionCategory = (id) => {
        this.props.deleteQuestionCategory(id)
            .then((res) => {
                this.setState({ loading: false });
                this.setState({ done: true });
            },(err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false })));
    }
    render() {
        if (this.props.loader.loading) {
            return (
                <Loader loading={this.props.loader.loading} />
            );
        }
        return (
            <Panel header={this.props.heading}>
                <form id="form-list-client">
                    <div className="pull-right">
                        <NavLink exact to="/admin/categories/add" className="btn btn-primary btn-sm"><i className="glyphicon glyphicon-plus"></i>Add Category</NavLink>
                    </div>

                    <QuestionCategoryList questionCategories={this.props.questionCategories} deleteQuestionCategories={this.deleteQuestionCategory} />

                </form>
            </Panel>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        questionCategories: state.questionCategories,
        loader: state.loaderReducer
    }
}

export default connect(mapStateToProps, { fetchQuestionCategoryList, deleteQuestionCategory })(QuestionCategoriesIndex);