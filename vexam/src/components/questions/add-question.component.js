import React from 'react';
import classnames from 'classnames';

import { connect } from 'react-redux';

import ReactQuill from 'react-quill';
import theme from 'react-quill/dist/quill.snow.css';

import { Redirect, match, matchPath, NavLink } from 'react-router-dom';
import { Bootstrap, Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem, Panel } from 'react-bootstrap';

import { fetchQuestionById, saveQuestion, updateQuestion } from '../../actions/questions.action';
import OptionInputs from './add-options.component';

import { fetchQuestionCategoryList } from '../../actions/questionCategory.action';
import { fetchQuestionComplexityList } from '../../actions/questionComplexity.action';

import { uploadDocumentRequest } from '../../actions/fileupload.action';

import { API_URL } from '../../utils/url';



class AddQuestion extends React.Component {

    state = {
        QuestionId: this.props.question ? this.props.question.QuestionId : 0,
        QuestionTypeId: this.props.question ? this.props.question.QuestionTypeId : '1',
        QuestionCategoryId: this.props.question ? this.props.question.QuestionCategoryId : '',
        Attachment: this.props.question ? this.props.question.Attachment : '',
        QuestionComplexityId: this.props.question ? this.props.question.QuestionComplexityId : '',
        Question: this.props.question ? this.props.question.Question : '',
        Marks: this.props.question ? this.props.question.Marks : '',
        PreparedBy: 2,
        errors: {},
        loading: false,
        done: false,
        subjectiveAnswer: this.props.question ? this.props.question.SubjectiveAnswer : '',
        defaultQuestionType: '2',
        Options: [
            {
                ObjectiveQuestionOptionId: 0,
                AnswerOption: '',
                IsAnswer: false,
                Attachment: ''
            }, {
                ObjectiveQuestionOptionId: 0,
                AnswerOption: '',
                IsAnswer: false,
                Attachment: ''
            }, {
                ObjectiveQuestionOptionId: 0,
                AnswerOption: '',
                IsAnswer: false,
                Attachment: ''
            }, {
                ObjectiveQuestionOptionId: 0,
                AnswerOption: '',
                IsAnswer: false,
                Attachment: ''
            }
        ]
    }



    // after new props are received from store, the ui must be aware of the new props 
    // and show the data into the form using this lifecycle event

    componentWillReceiveProps = (new_props) => {
        if (this.props.match.params.id) {
            this.setState({
                QuestionId: new_props.questions ? new_props.questions.Question.QuestionId : null,
                QuestionTypeId: new_props.questions ? new_props.questions.Question.QuestionTypeId : '1',
                QuestionCategoryId: new_props.questions ? new_props.questions.Question.QuestionCategoryId : '',
                Attachment: new_props.questions ? new_props.questions.Question.Attachment : '',
                QuestionComplexityId: new_props.questions ? new_props.questions.Question.QuestionComplexityId : '',
                Question: new_props.questions ? new_props.questions.Question.Question : '',
                Marks: new_props.questions ? new_props.questions.Question.Marks : '',
                PreparedBy: 2,
                errors: {},
                loading: false,
                done: false,
                subjectiveAnswer: new_props.questions ? new_props.questions.Question.SubjectiveAnswer : '',
                defaultQuestionType: '1',
                Options: new_props.questions.Options
            });
        }

    }

    // this lifecycle event works when we first load component
    componentDidMount = (props) => {
        this.props.fetchQuestionCategoryList();
        this.props.fetchQuestionComplexityList();
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
            this.setState({
                Marks: e.target[e.target.selectedIndex].getAttribute('data-marks')
            });
        }

    }

    handleChangeForEditor = (value) => {
        this.setState({
            Question: value
        })
    }
    handleMarksChange = (e) => {
        this.setState({
            Marks: e.target.value
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();

        // validate the form here
        let errors = {};
        if (this.state.QuestionTypeId == '') {
            errors.QuestionTypeId = 'Select at least on question type.';
        }
        if (this.state.QuestionCategoryId == '') {
            errors.QuestionCategoryId = 'Select at least on question category.';
        }

        if (this.state.QuestionComplexityId === '') {
            errors.QuestionComplexityId = 'Select at least on question complexity.';
        }

        if (this.state.Question === '') {
            errors.Question = 'Question is required.';
        }

        this.setState({
            errors
        });




        const isValid = Object.keys(errors).length === 0;



        if (isValid) {
            const { QuestionId, QuestionTypeId, QuestionComplexityId, QuestionCategoryId, Question, Marks, Attachment, Options, JobTitleId, PreparedBy } = this.state;


            this.setState({ loading: true });

            var model = {
                "Question": {
                    QuestionId: QuestionId,
                    Question: Question,
                    QuestionCategoryId: QuestionCategoryId,
                    QuestionComplexityId: QuestionComplexityId,
                    Attachment: Attachment,
                    PreparedBy: PreparedBy,
                    QuestionTypeId: QuestionTypeId,
                    Marks: Marks
                },
                "Options": Options
            }
            if (this.state.QuestionId > 0) {

                this.props.updateQuestion(model)
                    .then((res) => {
                        alert("Question Updated Successfully");
                        this.setState({ done: true });
                        this.setState({ loading: false });
                       
                    },
                    (err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
                    );

            } else {

                this.props.saveQuestion(model)
                    .then(() => {
                         alert("Question Saved Successfully");
                        this.setState({ done: true });
                        this.setState({ loading: false });
                     


                    },
                    (err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
                    );
            }
        }
    }

    handleFileUpload = (e) => {
        const file = e.target.files[0];
        this.props.uploadDocumentRequest(file)
            .then((res) => {
                this.setState({ Attachment: res.data.relativeFilePath });

            },
            (err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
            );
    }

    handleOptionImageUpload = (idx) => (e) => {
        const file = e.target.files[0];
        this.props.uploadDocumentRequest(file)
            .then((res) => {
                const newOptions = this.state.Options.map((option, oidx) => {
                    if (idx !== oidx) return option;
                    return { ...option, Attachment: res.data.relativeFilePath };
                });
                this.setState({ Options: newOptions });
            },
            (err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
            );
    }

    handleOptionValueChange = (idx) => (evt) => {
        const newOptions = this.state.Options.map((option, oidx) => {
            if (idx !== oidx) return option;
            return { ...option, AnswerOption: evt.target.value };
        });
        this.setState({ Options: newOptions });
    }


    handleIsAnswerCheckBox = (idx) => (evt) => {
        const newOptions = this.state.Options.map((option, oidx) => {
            if (idx !== oidx) return option;
            return { ...option, IsAnswer: evt.target.checked }
        });

        this.setState({ Options: newOptions });
    }


    handleAddOption = () => {
        this.setState({ Options: this.state.Options.concat([{ AnswerOption: '', IsAnswer: false }]) }); 
    }


    handleRemoveOption = (idx) => () => {
        this.setState({ Options: this.state.Options.filter((o, oidx) => idx !== oidx) });
    }



    renderOptions = () => {
        if (this.state.QuestionTypeId !=  '1') {
            return (
                <tbody>
                    {this.state.Options.map((option, idx) => (
                        <tr className="options" key={idx}>
                            <td>
                                <input
                                    type="text"
                                    placeholder={`option #${idx + 1}`}
                                    value={option.AnswerOption}
                                    className="form-control"
                                    onChange={this.handleOptionValueChange(idx)}
                                />
                            </td>
                            <td>
                                <img src={option.Attachment ? (this.API_URL + option.Attachment) : ""} width={100} style={{ float: 'right' }} />
                                <input type="file" accept="image/*" onChange={this.handleOptionImageUpload(idx)} />
                            </td>
                            <td><input type="checkbox" checked={option.IsAnswer} onChange={this.handleIsAnswerCheckBox(idx)} />Is Answer</td>
                            <td><button className="btn btn-danger btn-sm" type="button" onClick={this.handleRemoveOption(idx)}>x</button></td>
                        </tr>
                    ))}

                    <tr>
                        <td colSpan="3">
                            <button type="button" className="btn btn-primary btn-sm" onClick={this.handleAddOption} >Add Option</button>
                        </td>
                    </tr>
                </tbody>
            )
        }
    }


    handleOptionTypeEvent = (e) => {
        this.setState({
            QuestionTypeId: e.target.value
        });
    }



    renderForm() {
        return (
            <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleFormSubmit}>
                <div className="form-group col-xs-10 col-sm-4 col-md-6 col-lg-4">
                    <div className={classnames('field', { errors: !!this.state.errors.QuestionCategoryId })}>
                        <label>Category </label>
                        <select name="QuestionCategoryId" className="form-control" onChange={this.handleChange.bind(this)}>
                            <option value="0">--Select Category--</option>
                            {
                                this.props.categoryList.map((category, idx) => (
                                    <option selected={category.QuestionCategoryId === this.state.QuestionCategoryId ? true : false} value={category.QuestionCategoryId}>{category.CategoryName}</option>
                                ))
                            }

                        </select>
                        <span className="form-error">{this.state.errors.QuestionCategoryId}</span>
                    </div>
                </div>

                <div className="form-group col-xs-10 col-sm-4 col-md-6 col-lg-4">
                    <div className={classnames('field', { errors: !!this.state.errors.QuestionComplexityId })}>
                        <label>Question Complexity</label>
                        <select name="QuestionComplexityId" className="form-control" onChange={this.handleChange.bind(this)}>
                            <option value="0">--Select Complexity--</option>
                            {this.props.complexityList.map((complexity, idx) => (
                                <option selected={complexity.QuestionComplexityId === this.state.QuestionComplexityId ? true : false} data-marks={complexity.Marks} value={complexity.QuestionComplexityId}>{complexity.ComplexityTitle}</option>
                            ))}
                        </select>
                        <span className="form-error">{this.state.errors.QuestionComplexityId}</span>
                    </div>
                </div>
                <div className="form-group col-xs-10 col-sm-4 col-md-6 col-lg-4">
                    <div className={classnames('field', { errors: !!this.state.errors.Marks })}>
                        <label>Marks</label>
                        <input
                            type="text"
                            value={this.state.Marks}
                            className="form-control"
                            onChange={this.handleMarksChange}
                        />
                        <span className="form-error">{this.state.errors.QuestionComplexityId}</span>
                    </div>
                </div>

                <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className={classnames('field', { errors: !!this.state.errors.Question })}>
                        <label>Enter the question</label>
                        <ReactQuill name="Question" value={this.state.Question}
                            onChange={this.handleChangeForEditor} />
                        <input type="file" accept="image/*" onChange={this.handleFileUpload} />
                        <div className="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <img src={this.state.Attachment ? (this.API_URL + this.state.Attachment) : ""} width="100%" />
                        </div>
                        <span className="form-error">{this.state.errors.Question}</span>
                    </div>
                </div>



                <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className={classnames('field', { errors: !!this.state.errors.QuestionTypeId })}>
                        <label className="radio-inline"><input type="radio" value="1" name="QuestionTypeId" checked={this.state.QuestionTypeId == '1' ? true : false} onChange={this.handleOptionTypeEvent} disabled={this.state.QuestionId > 0 ? true : false} />Subjective</label>
                        <label className="radio-inline"><input type="radio" value="2" name="QuestionTypeId" checked={this.state.QuestionTypeId == '2' ? true : false} onChange={this.handleOptionTypeEvent} disabled={this.state.QuestionId > 0 ? true : false} />Objective</label>


                        <span className="form-error">{this.state.errors.QuestionTypeId}</span>
                    </div>
                </div>

                <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className={classnames('field')}>
                        <table className="table table-responsive table-hover table-bordered">
                            {this.renderOptions()}
                        </table>

                    </div>
                </div>

                <div className="clearfix"></div>

                <div className="btn-form-margin-top div-add-question">
                    <button className="btn btn-success btn-sm">Save</button>
                    <NavLink to={`/admin/questions`} className="btn btn-danger btn-sm btn-right-margin"><span>Cancel</span></NavLink>
                </div>

            </form>
        )
    }

    render() {
        return (
            <Panel header={this.props.heading}>

                {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}
                {this.state.done ? <Redirect to="/admin/questions" /> : this.renderForm()}
               

            </Panel>
        )

    }
}


function mapStateToProps(state, props) {

    if (props.match.params.id) {
        return {
            complexityList: state.questionComplexities,
            categoryList: state.questionCategories,
            questions: state.questions.QuestionWithOptions
        }
    }

    return {
        questions: null,
        complexityList: state.questionComplexities,
        categoryList: state.questionCategories
    }
}


export default connect(mapStateToProps, { fetchQuestionById, saveQuestion, updateQuestion, fetchQuestionCategoryList, fetchQuestionComplexityList, uploadDocumentRequest })(AddQuestion);