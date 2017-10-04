import React from 'react'
import update from 'react-addons-update'

import { connect } from 'react-redux'


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
            currentPage: 1,
            pageSize: 4,
            totalPages: 4,
            startPage: 1,
            endPage: 4

        };

        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);


        // this.handleJumpIndexClick = this.handleJumpIndexClick.bind(this);

        this.onChangePage = this.onChangePage.bind(this);

    }


    // componentWillReceiveProps = (new_props) => {
    //     this.setState({
    //         questions: new_props.quizQuestions
    //     });
    // }

    // componentDidMount() {
    //     this.props.getExamQuestions();
    // }


    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }


    handleAnswerSelected = () => {

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

        console.log(question)
        // get the page of items
        // and set the state to that page of items

        var arr = this.props.questionsList; //[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
        var chunked = this.chunk(arr, 0, 4/*Math.floor(arr.length/4)*/);

        console.log(chunked);

        var arrActive = null;

        chunked.map((key, val) => {
            var idx = key.indexOf(question);
            console.log('index', idx)
            if (idx > -1) {
                arrActive = key;
                this.setState({
                    currentPage: val + 1,
                    startPage: val +1
                })
            }
        })
        
        this.onChangePage(arrActive);
    }

    renderQuestionJumpIndex = () => (
        this.props.questionsList.map((question, idx) => {
            return <li onClick={this.handleJumpIndexClick.bind(this, question)} className=''><span>{idx + 1}</span></li>
        })
    )

    onAddSubjectiveAnswer(questionId, e) {
        alert(questionId)
        let that = this;
        var subjectiveAnswers = Object.assign({}, this.state.subjectiveAnswers);

        var arr = this.props.questionsList.filter((key) => {
            return key.Question.QuestionId == questionId
        })

        console.log('subject question filtered from array:', arr)

        // arr[0].Options.map((key,value)=>{
        //     if(key.ObjectiveQuestionOptionId == optionId){
        //         key.IsAnswer = key.IsAnswer ? false : true;
        //     }
        // })


        // var model = {
        //     questionId: id,
        //     optionId: 0,
        //     IntervieweeId: this.props.user.IntervieweeId,
        //     AnswerBy: this.props.user.IntervieweeId,
        //     subjectiveAnswer: e
        // };

        // subjectiveAnswers[id] = model;

        /* set the state to the new variable */
        this.setState({ subjectiveAnswers: subjectiveAnswers },
            () => {
                this.props.setSubjectiveAnswerToStore(this.state.subjectiveAnswers);
            });
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
                                <Pagination items={this.props.questionsList} currentPage={this.state.currentPage} pageSize={this.state.pageSize} startPage={this.state.currentPage} endPage={this.state.endPage} onChangePage={this.onChangePage} />
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