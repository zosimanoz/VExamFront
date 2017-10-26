import React from 'react'
import update from 'react-addons-update'

import { connect } from 'react-redux'
import range from 'lodash/range'


import { getExamQuestions } from '../../actions/examQuiz.action'
import { setSubjectiveAnswerToStore } from '../../actions/answers.action'

import Pagination from '../common/pagination.component'
import ExamQuestionList from './ExamQuestionList.component'


import '../exam/exam.css'


class ExamMainPage extends React.Component {

    // we need an initial state to populate the data
    constructor(props) {
        super(props);

        this.state = {
            counter: 0,
            questionId: 1,
            question: '',
            answerOptions: [],
            answer: '',
            result: '',
            disableBtnPrev: false,
            questions: null,
            exampleItems: null,
            pageOfItems: [],
            subjectiveAnswers: {},
            text: '',
            pager: {}
        };

        this.onChangePage = this.onChangePage.bind(this);
    }


    componentWillReceiveProps = (new_props) => {
        this.setState({
            pager: {
                totalItems: new_props.questionsList.length,
                currentPage: 1,
                pageSize: 4,
                totalPages: Math.ceil(new_props.questionsList / 4),
                startPage: 1,
                endPage: Math.ceil(new_props.questionsList / 4),
                startIndex: 0,
                endIndex: 3,
                pages: new_props.questionsList.slice(0, 4)
            }
        });
    }

    componentDidMount() {
        if (this.props.user) {
            console.log('user --->',this.props.user.IntervieweeId);
            this.props.getExamQuestions(this.props.user.IntervieweeId);
        }
    }


    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }


    setPagerFromJumpIndex(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 4;

        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);

        var startPage, endPage;

        startPage = 1;
        endPage = totalPages;

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages = range(startPage, endPage + 1);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }



    chunk(arr, start, amount) {
        var result = [],
            i,
            start = start || 0,
            amount = amount || 500,
            len = arr.length;

        do {
            result.push(arr.slice(start, start + amount));
            start += amount;

        } while (start < len);

        return result;
    };



    handleJumpIndexClick(question) {
        // get the page of items
        // and set the state to that page of items

        var arr = this.props.questionsList;
        var chunked = this.chunk(arr, 0, 4);

        var arrActive = null;
        var page = 1;

        chunked.map((key, val) => {
            var idx = key.indexOf(question);
            if (idx > -1) {
                arrActive = key;
                page = val + 1;
            }
        })

        var pager = this.setPagerFromJumpIndex(this.props.questionsList.length, page);

        // get new page of items from items array
        var pages = arr.slice(pager.startIndex, pager.endIndex + 1);

        pager.pages = pages;

        this.setState({
            pager: pager
        })

        this.onChangePage(pager.pages);

    }

    renderQuestionJumpIndex = () => (
        this.props.questionsList.map((question, idx) => {
            let cssClass = ''

            this.state.pager.pages.map((currentQuestion, value) => {
                if (question == currentQuestion) {
                    cssClass = 'currQue';
                }
            })
            return (
                <li className={cssClass} onClick={this.handleJumpIndexClick.bind(this, question)}><span>{idx + 1}</span></li>
            )
        })
    )

    onAddSubjectiveAnswer(questionId, e) {
        let that = this;
        var subjectiveAnswers = Object.assign({}, this.state.subjectiveAnswers);

        var arr = this.props.questionsList.filter((key) => {
            return key.Question.QuestionId == questionId
        })

        this.setState({ subjectiveAnswers: subjectiveAnswers },
            () => {
                this.props.setSubjectiveAnswerToStore(this.state.subjectiveAnswers);
            });
    }


    setPager(pager) {
        this.setState({
            pager: pager
        })
    }


    render() {
        return (
            <div>
                <div className="col-md-8">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <p>Exam Set for Software Engineer</p>
                        </div>
                        <div className="panel-body">

                            {
                                this.state.pageOfItems ?
                                    <ExamQuestionList questionsList={this.props.questionsList} questions={this.state.pageOfItems} onAddSubjectiveAnswer={this.onAddSubjectiveAnswer} /> :
                                    <p>No questions found</p>
                            }

                            <div className="pager">
                                <Pagination parentState={this.state} setPager={this.setPager.bind(this)} items={this.props.questionsList} pager={this.state.pager} onChangePage={this.onChangePage} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div id="scorecard" className="menu">
                        <ul>
                            {this.props.questionsList ? this.renderQuestionJumpIndex() : 'Loading'}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }


}


const mapStateToProps = (state, props) => {
    return {
        questionsList: state.quizReducer.questions,
        user: state.authReducer.user
    }
}



export default connect(mapStateToProps, { getExamQuestions })(ExamMainPage);