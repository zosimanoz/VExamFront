import React from 'react';
import { Panel } from 'react-bootstrap';
import classnames from 'classnames';
import { Redirect, match, matchPath, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import RawHtml from "react-raw-html"

import theme from 'react-quill/dist/quill.snow.css';

import Loader from '../loader/loader.component';
import QuestionComponent from './question-detail.component';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { fetchSubjectiveAnswersheetByIntervieweeId, saveMarks,autoCheckObjectiveQuestions } from '../../actions/checkAnswer.action';


class SubjectiveQuestions extends React.Component {
    constructor(props) {
        super(props);
    }


    EmptyMessage() {
        return (
            <div className="clearfix">
                <p>No answers found</p>
            </div>
        )
    }

    submitMarks() {
        var result = [];
        this.props.listQuestions.map((item, i) =>{
            item.Question.ExaminerId = this.props.user.UserId;
            result.push(item.Question)
        });
        this.props.saveMarks(result);
        this.props.autoCheckObjectiveQuestions(result[0].IntervieweeId);
    }

    RenderAnswersheetTable() {
        return (
            <div className="clearfix ScrollStyle">
                <div className="alert alert-info fade in">
                    <strong>Note!</strong> 
                    <p>On clicking submit button, subjective answers are marked with the marks provided and objective questions are automatically marked by the system.</p>
                    </div>
                {
                    this.props.listQuestions.map((item, i) =>
                        <QuestionComponent {...this.props} questionInfo={item} />
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
                <a title="Submit" className="btn btn-success btnSubmitScore" onClick={() => confirmAlert({
                    message: 'Are you sure to submit answersheet?',
                    confirmLabel: 'Yes',
                    cancelLabel: 'No',
                    onConfirm: () => this.submitMarks()
                })}> Submit</a>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    if (props.match.params.id) {
        return {
            //  questionList: state.answersheetReducer.answersheet,
            loader: state.loaderReducer,
            user: state.authReducer.user
        }
    }
    return {
        //    questionList: null,
        loader: state.loaderReducer
    }
}


export default connect(mapStateToProps, { fetchSubjectiveAnswersheetByIntervieweeId, saveMarks,autoCheckObjectiveQuestions })(SubjectiveQuestions
);