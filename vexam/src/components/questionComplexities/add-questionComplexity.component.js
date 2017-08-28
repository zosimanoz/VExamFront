import React from 'react';
import classnames from 'classnames';

import { connect } from 'react-redux';

import { Redirect, match, matchPath } from 'react-router-dom';

import { Bootstrap, Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem, Panel } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { saveQuestionComplexity, fetchQuestionComplexityById, updateQuestionComplexity } from '../../actions/questionComplexity.action';


class AddQuestionComplexity extends React.Component {


    state = {
        QuestionComplexityId: this.props.questionComplexities ? this.props.questionComplexities.QuestionComplexityId : null,
        ComplexityCode: this.props.questionComplexities ? this.props.questionComplexities.ComplexityCode : '',
        ComplexityTitle: this.props.questionComplexities ? this.props.questionComplexities.ComplexityTitle : '',
        Marks: this.props.questionComplexities ? this.props.questionComplexities.Marks : '',
        errors: {},
        loading: false,
        done: false
    }


    // after new props are received from store, the ui must be aware of the new props 
    // and show the data into the form using this lifecycle event

    componentWillReceiveProps = (new_props) => {
        this.setState({
            QuestionComplexityId: new_props.questionComplexities.QuestionComplexityId,
            ComplexityCode: new_props.questionComplexities.ComplexityCode,
            ComplexityTitle: new_props.questionComplexities.ComplexityTitle,
            Marks: new_props.questionComplexities.Marks
        });
    }

    // this lifecycle event works when we first load component
    componentDidMount = (props) => {
        console.log(this.props)
        if (this.props.match.params.id) {
            this.props.fetchQuestionComplexityById(this.props.match.params.id);
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
        if (this.state.ComplexityCode === '') {
            errors.ComplexityCode = 'complexity Code cannot be empty';
        }
        if (this.state.ComplexityTitle === '') {
            errors.ComplexityTitle = 'Complexity Titlee cannot empty.';
        }

        this.setState({
            errors
        });


        const isValid = Object.keys(errors).length === 0;

        if (isValid) {
            const { QuestionComplexityId, ComplexityCode, ComplexityTitle, Marks } = this.state;

            this.setState({ loading: true });

            if (QuestionComplexityId > 0) {
                this.props.updateQuestionComplexity({ QuestionComplexityId, ComplexityCode, ComplexityTitle, Marks })
                    .then(() => {
                        this.setState({ done: true });
                        this.setState({ loading: false });
                    },
                    (err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
                    );
            } else {
                this.props.saveQuestionComplexity({ ComplexityCode, ComplexityTitle, Marks })
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
                <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                        <div className={classnames('field', { errors: !!this.state.errors.Message })}>
                            <label>Complexity Code </label>
                            <input type="text"
                                name="ComplexityCode"
                                className="form-control"
                                value={this.state.ComplexityCode}
                                onChange={this.handleChange}

                            />

                            <span className="form-error">{this.state.errors.Message}</span>
                        </div>
                    </div>
                                        <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                        <div className={classnames('field', { errors: !!this.state.errors.Message })}>
                            <label>Marks</label>
                            <input type="text"
                                name="Marks"
                                className="form-control"
                                value={this.state.Marks}
                                onChange={this.handleChange}
                            />
                            <span className="form-error">{this.state.errors.Message}</span>
                        </div>
                    </div>
                </div>

                <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                        <div className={classnames('field', { errors: !!this.state.errors.Message })}>
                            <label>Complexity Title</label>
                            <input type="text"
                                name="ComplexityTitle"
                                className="form-control"
                                value={this.state.ComplexityTitle}
                                onChange={this.handleChange}

                            />

                            <span className="form-error">{this.state.errors.Message}</span>
                        </div>
                    </div>

                </div>
                <div className="btn-form-margin-top pull-right">
                    <button className="btn btn-success btn-sm">Save</button>
                    <NavLink to={`/admin/complexities`} className="btn btn-danger btn-sm btn-right-margin"><span>Cancel</span></NavLink>
                </div>
            </form>

        )
    }

    render() {

        return (
            <Panel header={this.props.heading}>

                {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}

                {this.state.done ? <Redirect to="/admin/complexities" /> : this.renderForm()}

            </Panel>
        )

    }

}


function mapStateToProps(state, props) {
    if (props.match.params.id) {
        return {
            questionComplexities: state.questionComplexities.find(item => item.QuestionComplexityId == props.match.params.id)
        }
    }

    return {
        questionComplexities: null
    }
}


export default connect(mapStateToProps, { saveQuestionComplexity, fetchQuestionComplexityById, updateQuestionComplexity })(AddQuestionComplexity);