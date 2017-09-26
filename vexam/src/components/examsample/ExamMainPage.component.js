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
            text: ''
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

    handleJumpIndexClick(id) {
        alert(id)
    }

    renderQuestionJumpIndex = () => (
        this.props.questionsList.map((question, idx) => {
            return <li onClick={this.handleJumpIndexClick.bind(this, question.Question.QuestionId)} className=''><span>{idx + 1}</span></li>
        })
    )

    onAddSubjectiveAnswer(id, e) {

        let that = this;
        var subjectiveAnswers = Object.assign({}, this.state.subjectiveAnswers);

        var model = {
            questionId: id,
            optionId: 0,
            IntervieweeId: this.props.user.IntervieweeId,
            AnswerBy: this.props.user.IntervieweeId,
            subjectiveAnswer: e
        };

        subjectiveAnswers[id] = model;

        /* set the state to the new variable */
        this.setState({ subjectiveAnswers: subjectiveAnswers },
        ()=> {
            this.props.setSubjectiveAnswerToStore(this.state.subjectiveAnswers);
        });
        console.log(this.state.subjectiveAnswers)
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
                                <Pagination items={this.props.questionsList} onChangePage={this.onChangePage} />
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
        quizQuestions: state.quizReducer.questions,
        user: state.authReducer.user
    }
}



export default connect(mapStateToProps, { getExamQuestions })(ExamMainPage);