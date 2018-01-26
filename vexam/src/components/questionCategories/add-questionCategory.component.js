import React from 'react';
import classnames from 'classnames';

import { connect } from 'react-redux';

import { Redirect, match, matchPath } from 'react-router-dom';

import { Bootstrap, Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem, Panel } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { saveQuestionCategory, fetchQuestionCategoryById, updateQuestionCategory } from '../../actions/questionCategory.action';


class AddQuestionCategory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            QuestionCategoryId: this.props.questionCategories ? this.props.questionCategories.QuestionCategoryId : null,
            CategoryCode: this.props.questionCategories ? this.props.questionCategories.CategoryCode : '',
            CategoryName: this.props.questionCategories ? this.props.questionCategories.CategoryName : '',
            Description: this.props.questionCategories ? this.props.questionCategories.Description : '',
            errors: {},
            loading: false,
            done: false
        }
    }



    // after new props are received from store, the ui must be aware of the new props 
    // and show the data into the form using this lifecycle event

    componentWillReceiveProps = (new_props) => {
        this.setState({
            QuestionCategoryId: new_props.questionCategories.QuestionCategoryId,
            CategoryCode: new_props.questionCategories.CategoryCode,
            CategoryName: new_props.questionCategories.CategoryName,
            Description: new_props.questionCategories.Description
        });
    }

    // this lifecycle event works when we first load component
    componentDidMount = (props) => {
        if (this.props.match.params.id) {
            this.props.fetchQuestionCategoryById(this.props.match.params.id);
        }
    }

    handleChange = (e) => {

        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];

            this.setState({
                [e.target.name]: e.target.value,
                errors
            });
        } else {
            this.setState({
                [e.target.name]: e.target.value
            });
        }

    }

    handleFormSubmit = (e) => {

        e.preventDefault();

        // validate the form here

        let errors = {};
        if (this.state.CategoryCode === '') {
            errors.CategoryCode = 'Category Code cannot be empty';
        }
        if (this.state.CategoryName === '') {
            errors.CategoryName = 'Category Name cannot be left empty.';
        }

        this.setState({
            errors
        });


        const isValid = Object.keys(errors).length === 0;

        if (isValid) {
            const { QuestionCategoryId, CategoryCode, CategoryName, Description } = this.state;


            this.setState({ loading: true });

            if (QuestionCategoryId > 0) {
                this.props.updateQuestionCategory({ QuestionCategoryId, CategoryCode, CategoryName, Description })
                    .then(() => {
                        this.setState({ done: true });
                        this.setState({ loading: false });
                    },
                    (err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
                    );
            } else {
                this.props.saveQuestionCategory({ CategoryCode, CategoryName, Description })
                    .then(() => {
                        this.setState({ done: true });
                        this.setState({ loading: false })
                    },
                    (err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
                    );
            }


        }
    }


    renderForm() {
        return (
            <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleFormSubmit}>
                <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                    <div className={classnames('field', { errors: !!this.state.errors.CategoryCode })}>
                        <label>Category Code </label>
                        <input type="text"
                            name="CategoryCode"
                            className="form-control"
                            value={this.state.CategoryCode}
                            onChange={this.handleChange}

                        />

                        <span className="form-error">{this.state.errors.CategoryCode}</span>
                    </div>
                </div>
                <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                    <div className={classnames('field', { errors: !!this.state.errors.CategoryName })}>
                        <label>Category Name </label>
                        <input type="text"
                            name="CategoryName"
                            className="form-control"
                            value={this.state.CategoryName}
                            onChange={this.handleChange}

                        />

                        <span className="form-error">{this.state.errors.CategoryName}</span>
                    </div>
                </div>
                <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className={classnames('field', { errors: !!this.state.errors.Message })}>
                        <label>Description</label>
                        <textarea
                            name="Description"
                            className="form-control"
                            value={this.state.Description}
                            onChange={this.handleChange}

                        />
                        <span className="form-error">{this.state.errors.Message}</span>
                    </div>
                </div>
                <div className="btn-form-margin-top pull-right">
                    <button className="btn btn-success btn-sm">Save</button>
                    <NavLink to={`/admin/categories`} className="btn btn-danger btn-sm btn-right-margin"><span>Cancel</span></NavLink>
                </div>
            </form>

        )
    }

    render() {

        return (
            <Panel header={this.props.heading}>

                {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}

                {this.state.done ? <Redirect to="/admin/categories" /> : this.renderForm()}

            </Panel>
        )

    }

}


function mapStateToProps(state, props) {
    if (props.match.params.id) {
        return {
            questionCategories: state.questionCategories.find(item => item.QuestionCategoryId == props.match.params.id)
        }
    }

    return {
        questionCategories: null
    }
}


export default connect(mapStateToProps, { saveQuestionCategory, fetchQuestionCategoryById, updateQuestionCategory })(AddQuestionCategory);