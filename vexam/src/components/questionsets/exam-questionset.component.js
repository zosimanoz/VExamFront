import React from 'react';
import { Panel } from 'react-bootstrap';

import classnames from 'classnames';
import { Redirect, match, matchPath } from 'react-router-dom';

import ReactQuill from 'react-quill';
import theme from 'react-quill/dist/quill.snow.css';


class ExamQuestions extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        errors: {},
        loading: false,
        done: false,
        questionsList: [
            {
                QuestionId : 1,
                Title : 'Some quesiton tittle',
                QuestionCategoryId: 1,
                QuestionCategory: 'C#',
                QuestionComplexityId : 1,
                QuestionComplexity: 'Basic'
            },
            {
                QuestionId : 2,
                Title : 'Second quesiton tittle',
                QuestionCategoryId: 1,
                QuestionCategory: 'C#',
                QuestionComplexityId : 2,
                QuestionComplexity: 'Intermediate'
            },
            {
                QuestionId : 1,
                Title : 'java quesiton tittle',
                QuestionCategoryId: 1,
                QuestionCategory: 'Java',
                QuestionComplexityId : 1,
                QuestionComplexity: 'Basic'
            }
        ]
    }


    handleQuestionSelectChange = (idx) => (evt) => {
        evt.preventDefault();
    }


    renderQuestionList() {
         return (
                <tbody>

                    {this.state.questionsList.map((question, idx) => (
                        <tr className="options" key={idx}>
                            <td>
                                <input
                                    type="checkbox"
                                    onChange={this.handleQuestionSelectChange(idx)} />
                            </td>
                            <td>{question.Title}</td>
                            <td>{question.QuestionCategory}</td>
                            <td>{question.QuestionComplexity}</td>
                        </tr>
                    ))}
                </tbody>
            )
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
                    <div className={classnames('field')}>
                        <table className="table table-responsive table-hover table-bordered">
                            {this.renderQuestionList()}
                        </table>
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
                {this.renderForm()}
            </Panel>
        )
    }
}

export default ExamQuestions;