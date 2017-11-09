import React from 'react';
import { Panel } from 'react-bootstrap';
import classnames from 'classnames';
import { Redirect, match, matchPath, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import RawHtml from "react-raw-html"

import theme from 'react-quill/dist/quill.snow.css';

import Loader from '../loader/loader.component';

import { fetchAllAnswersheetByIntervieweeId } from '../../actions/checkAnswer.action';


class AllQuestions extends React.Component {
    constructor(props) {
        super(props);
    }


    EmptyMessage() {
        return (
            <div className="clearfix">
                No answers found
            </div>
        )
    }
       renderOption(option){
     
        var answerOption =""
        if(option.IsAnswer && option.AnswerByInterviewees){
            answerOption= <span className="glyphicon glyphicon-ok text-success" >&nbsp;</span>
        }else if(option.IsAnswer && !option.AnswerByInterviewees){
               answerOption= <span className="glyphicon glyphicon-ok option-Checkbox-white">&nbsp;</span>;
        }
        else if(!option.IsAnswer && option.AnswerByInterviewees){
             answerOption= <span className="glyphicon glyphicon-ok text-danger">&nbsp;</span>
        }
        else if(!option.IsAnswer && !option.AnswerByInterviewees){
            answerOption= <span className="glyphicon glyphicon-ok option-Checkbox-white">&nbsp;</span>;
        }
        return(
            <li className="answerOption">
                {answerOption}
                {option.IsAnswer ? <label className="text-success">{option.AnswerOption}</label> : <label>{option.AnswerOption}</label>}
             </li>
        )
    }
    renderQuestionOptions(options) {
        return (
            <div>
                <ul>
                    {options.map((item, i) =>

                        <li className="answerOption">
                            <input
                                type="checkbox"
                                className="quizcheckBox"
                                disabled={true}
                                checked={item.AnswerByInterviewees}
                            />
                            {item.IsAnswer ? <label className="text-success">{item.AnswerOption}</label> : <label>{item.AnswerOption}</label>}


                        </li>
                    )}
                </ul>
            </div>
        )
    }

    renderSubjectiveAnswer(subjectiveAnswer) {
        return (
            <div className="div-subjective-question-detail pull-left">
                <RawHtml.span>{subjectiveAnswer}</RawHtml.span>
            </div>
        )
    }

    RenderAnswersheetTable(props) {
        return (
            <div className="clearfix ScrollStyle">
                <div className="alert alert-info fade in">
                   <p>View all the answers submitted by Interviewee.</p>
                   <p> To Provide marks to the questions please select "Subjective Questions" Tab and mark the answers.</p>
                </div>
                {
                    this.props.listQuestions.map((item, i) =>
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="div-subjective-question-detail">
                                    <span className="span-question-index"><b>{i + 1}. &nbsp;</b></span>
                                      <span className="pull-right span-question-marks">Marks :{item.Question.MarksObtained}/ {item.Question.Marks}</span>
                                    <RawHtml.span>{item.Question.Question}</RawHtml.span>
                                    {item.Question.QuestionTypeId === 2 ? item.Options.map(this.renderOption) : this.renderSubjectiveAnswer(item.Question.subjectiveAnswer)}
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>
        )
    }


    render() {
        if (this.props.loader.loading) {
            return (
                <Loader loading={this.props.loader.loading} />
            );
        }

        let questionListComponent;
        if (this.props.listQuestions && this.props.listQuestions.length > 0) {
            questionListComponent = this.RenderAnswersheetTable()
        } else {
            questionListComponent = this.EmptyMessage()
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
            //   questionList: state.answersheetReducer.answersheet,
            loader: state.loaderReducer
        }
    }
    return {
        // questionList: null,
        loader: state.loaderReducer
    }
}


export default connect(mapStateToProps, { fetchAllAnswersheetByIntervieweeId })(AllQuestions
);