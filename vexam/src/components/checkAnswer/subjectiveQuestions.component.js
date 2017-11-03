import React from 'react';
import { Panel } from 'react-bootstrap';
import classnames from 'classnames';
import { Redirect, match, matchPath, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import RawHtml from "react-raw-html"

import theme from 'react-quill/dist/quill.snow.css';

import Loader from '../loader/loader.component';
import QuestionComponent from './question-detail.component';

import { fetchSubjectiveAnswersheetByIntervieweeId } from '../../actions/checkAnswer.action';


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

    RenderAnswersheetTable() {
        return (
            <div className="clearfix ScrollStyle">
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
            <div className="panel panel-default">
                <div className="panel-body">
                    {questionListComponent}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    if (props.match.params.id) {
        return {
            //  questionList: state.answersheetReducer.answersheet,
            loader: state.loaderReducer
        }
    }
    return {
        //    questionList: null,
        loader: state.loaderReducer
    }
}


export default connect(mapStateToProps, { fetchSubjectiveAnswersheetByIntervieweeId })(SubjectiveQuestions
);