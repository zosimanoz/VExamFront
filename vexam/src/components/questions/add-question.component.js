import React from 'react';
import classnames from 'classnames';

import { connect } from 'react-redux';

import TinyMCE from 'react-tinymce';

import ReactQuill from 'react-quill';
import theme from 'react-quill/dist/quill.snow.css';

import { Redirect, match, matchPath } from 'react-router-dom';

import { Bootstrap, Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem, Panel } from 'react-bootstrap';

import { fetchQuestionById } from '../../actions/questions.action';
import OptionInputs from './add-options.component';





class AddQuestion extends React.Component {


    state = {
        QuestionId: this.props.question ? this.props.question.QuestionId : null,
        QuestionTypeId: this.props.question ? this.props.question.QuestionTypeId : null,
        QuestionCategoryId: this.props.question ? this.props.question.QuestionCategoryId : null,
        // QuestionCategoryId
        // JobTitleId
        // Question
        // Attachment
        QuestionComplexityId: this.props.question ? this.props.question.QuestionComplexityId : null,
        // Marks
        // ObjectiveQuestionOptionId
        // AnswerOption
        // IsAnswer
        Question: this.props.question ? this.props.question.Question : '',
        Marks: this.props.question ? this.props.question.Marks : '',
        errors: {},
        loading: false,
        done: false,
        defaultQuestionType: '1',
        options: []
    }


    // after new props are received from store, the ui must be aware of the new props 
    // and show the data into the form using this lifecycle event

    componentWillReceiveProps = () => {

    }

    // this lifecycle event works when we first load component
    componentDidMount = (props) => {


        if (this.props.match.params.id) {
            this.props.fetchQuestionById(this.props.match.params.id);
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


    handleChangeForEditor = (value) => {
        this.setState({
            Question: value
        })
    }

    handleFormSubmit = (e) => {


        e.preventDefault();


        // validate the form here

        let errors = {};
        if (this.state.QuestionTypeId === '') {
            errors.QuestionTypeId = 'Select at least on question type.';
        }
        if (this.state.QuestionCategoryId === '') {
            errors.QuestionCategoryId = 'Select at least on question category.';
        }

        // if (this.state.QuestionComplexityId === '') {
        //     errors.QuestionComplexityId = 'Select at least on question complexity.';
        // }

        if (this.state.Question === '') {
            errors.Question = 'Question is required.';
        }
        // if (this.state.Marks === '') {
        //     errors.Marks = 'Marks is required.';
        // }

        this.setState({
            errors
        });




        const isValid = Object.keys(errors).length === 0;



        if (isValid) {
            const { Question } = this.state;


            this.setState({ loading: true });

            // if(DepartmentId) {
            //     this.props.updateDepartment({ DepartmentId, DepartmentCode, DepartmentName })
            //     .then(()=>{ 
            //         this.setState({ done: true });
            //         this.setState({ loading: false });
            //      },
            //         (err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
            //      );
            // }

            // this.props.saveDepartment({ DepartmentCode, DepartmentName })
            //     .then(() => { 
            //         this.setState({ done: true }); 
            //         this.setState({ loading: false }) 
            //     },
            //     (err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
            // );
        }
    }


    addOptions = () => {
        const options = this.state.options.concat(OptionInputs);
        console.log(options)
        this.setState({ options : options });
    }


    renderOptions = () => {

        

        if (this.state.defaultQuestionType === '1') {
            return (
                <input type="text" className="form-control" />
            )
        } else {
            const inputs = this.state.options.map((Element, index) => {
                return <Element key={index} index={index} />
            });
            return (
                <div>

                  <button type="button" className="btn btn-default" onClick={this.addOptions.bind(this)}><i className="glyphicon glyphicon-plus"></i></button>
                  {inputs} 
                </div>
            )
        }
    }


    handleOptionTypeEvent = (e) => {
        this.setState({
            defaultQuestionType: e.target.value
        });
    }



    renderForm() {
        return (
            <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleFormSubmit}>
                <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                    <div className={classnames('field', { errors: !!this.state.errors.QuestionCategoryId })}>
                        <label>Category </label>
                        <select name="QuestionCategoryId" className="form-control" onChange={this.handleChange}>
                            <option value="">--Select Category--</option>
                            <option value="1">Java</option>
                            <option value="2">C#</option>
                            <option value="3">JS</option>
                        </select>
                        <span className="form-error">{this.state.errors.QuestionCategoryId}</span>
                    </div>
                </div>

                <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                    <div className={classnames('field', { errors: !!this.state.errors.QuestionComplexityId })}>
                        <label>Question Complexity</label>
                        <select name="QuestionComplexityId" className="form-control" onChange={this.handleChange}>
                            <option value="">--Select Complexity--</option>
                            <option value="1">Basic</option>
                            <option value="2">Intermediate</option>
                            <option value="3">Advanced</option>
                        </select>
                        <span className="form-error">{this.state.errors.QuestionComplexityId}</span>
                    </div>
                </div>

                <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className={classnames('field', { errors: !!this.state.errors.Question })}>
                        <label>Enter the question</label>

                        <ReactQuill name="Question" value={this.state.Question}
                            onChange={this.handleChangeForEditor} />

                        <span className="form-error">{this.state.errors.Question}</span>
                    </div>
                </div>



                <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className={classnames('field', { errors: !!this.state.errors.QuestionTypeId })}>

                        <label className="radio-inline"><input type="radio" value="1" name="QuestionTypeId" checked={this.state.defaultQuestionType === '1' ? true : false} onChange={this.handleOptionTypeEvent} />Subjective</label>
                        <label className="radio-inline"><input type="radio" value="2" name="QuestionTypeId" checked={this.state.defaultQuestionType === '2' ? true : false} onChange={this.handleOptionTypeEvent} />Objective</label>


                        <span className="form-error">{this.state.errors.QuestionTypeId}</span>
                    </div>
                </div>



                <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className={classnames('field')}>

                        {this.renderOptions()}


                    </div>
                </div>




                <div className="clearfix"></div>

                <div className="btn-form-margin-top div-add-question">
                    <button className="btn btn-success btn-sm">Save</button>
                    <button className="btn btn-danger btn-sm btn-right-margin" type="button">Cancel</button>
                </div>

            </form>
        )
    }

    render() {

        return (
            <Panel header={this.props.heading}>

                {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}

                {this.state.done ? this.renderForm() : this.renderForm()}

            </Panel>
        )

    }

}


function mapStateToProps(state, props) {
    console.log(props)

    if (props.match.params.id) {
        return {
            question: state.question.find(item => item.QuestionId == props.match.params.id)
        }
    }

    return {
        question: null
    }
}


export default connect(mapStateToProps, { fetchQuestionById })(AddQuestion);