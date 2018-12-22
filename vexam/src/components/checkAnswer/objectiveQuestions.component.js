import React from 'react';
import { Panel } from 'react-bootstrap';
import classnames from 'classnames';
import { Redirect, match, matchPath, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import RawHtml from "react-raw-html"
import { API_URL } from '../../utils/url';
import theme from 'react-quill/dist/quill.snow.css';

import Loader from '../loader/loader.component';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import { fetchSubjectiveAnswersheetByIntervieweeId } from '../../actions/checkAnswer.action';
import { autoCheckObjectiveQuestions } from '../../actions/checkAnswer.action';



class ObjectiveQuestions extends React.Component {
    constructor(props) {
        super(props);
    }


    RenderEmptyMessage() {
        return (
            <div className="clearfix">
                <p>No answers found</p>
            </div>
        )
    }

    renderImage(item) {
        return (
            <div>
                <img className="answer-img" src={API_URL + item.Attachment} />
            </div>
        )
    }

    renderOption(option) {

        var answerOption = ""
        if (option.IsAnswer && option.AnswerByInterviewees) {
            answerOption = <span className="glyphicon glyphicon-ok text-success" >&nbsp;</span>
        } else if (option.IsAnswer && !option.AnswerByInterviewees) {
            answerOption = <span className="glyphicon glyphicon-ok option-Checkbox-white">&nbsp;</span>;
        }
        else if (!option.IsAnswer && option.AnswerByInterviewees) {
            answerOption = <span className="glyphicon glyphicon-ok text-danger">&nbsp;</span>
        }
        else if (!option.IsAnswer && !option.AnswerByInterviewees) {
            answerOption = <span className="glyphicon glyphicon-ok option-Checkbox-white">&nbsp;</span>;
        }
        return (
            <li className="answerOption">
                {answerOption}
                {option.IsAnswer ? <label className="text-success">{option.AnswerOption}</label> : <label>{option.AnswerOption}</label>}
                {option.Attachment != '' ? this.renderImage(option) : ''}
            </li>
        )
    }

    RenderAnswersheetTable() {
        return (
            <div className="clearfix ScrollStyle">
                <div>
                    {/* <strong>Note!</strong> Objective Questions are automatically checked and marked by the system. */}
                    <div style={{margin:'10px 0'}}><a title="Auto calcuate objective answers" className="btn btn-success btnSubmitScore" onClick={() => confirmAlert({
                    message: 'Are you sure to auto calculate objective marks?',
                    confirmLabel: 'Yes',
                    cancelLabel: 'No',
                    title: 'Auto calculate objective marks',
                    onConfirm: () => this.submitObjectiveMarks()
                })}> Auto calcuate objective answers</a>
                </div>

                </div>
                {
                    this.props.listObjectiveQuestions.map((item, i) =>
                        <div className="panel panel-default" key={i}>
                            <div className="panel-body">
                                <div className="div-subjective-question-detail">
                                    <span className="span-question-index"><b>{i + 1}. &nbsp;</b></span>
                                    <span className="pull-right span-question-marks">Marks :{item.Question.MarksObtained}/ {item.Question.Marks}</span>
                                    <RawHtml.span>{item.Question.Question}</RawHtml.span>
                                    {item.Question.QuestionTypeId === 2 ? item.Options.map(this.renderOption.bind(this)) : ''}
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>
        )
    }


    
    submitObjectiveMarks() {

        var result = [];
        this.props.listObjectiveQuestions.map((item, i) => {
            item.Question.ExaminerId = this.props.user.UserId;
            result.push(item.Question)
        });
        this.props.autoCheckObjectiveQuestions(result[0].IntervieweeId)
            .then((res) => {
                this.props.fetchAllAnswersheetByIntervieweeId(result[0].IntervieweeId);
            }).catch((err) => {
                alert('error');
            });
    }


    render() {
        if (this.props.loader.loading) {
            return (
                <Loader loading={this.props.loader.loading} />
            );
        }

        let questionListComponent;
        if (this.props.listObjectiveQuestions && this.props.listObjectiveQuestions.length > 0) {
            questionListComponent = this.RenderAnswersheetTable()
        } else {
            questionListComponent = this.RenderEmptyMessage()
        }
        return (
            <div>
                {questionListComponent}
            </div>

        )
    }
}

const mapStateToProps = (state, props) => {
    if (props.match.params.id) {
        return {
            loader: state.loaderReducer,
            user: state.authReducer.user
        }
    }
    return {
        loader: state.loaderReducer
    }
}


export default connect(mapStateToProps, {autoCheckObjectiveQuestions})(ObjectiveQuestions
);