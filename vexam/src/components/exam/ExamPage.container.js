import React from 'react'
import update from 'react-addons-update'

import { connect } from 'react-redux'


import { getExamQuestions } from '../../actions/examQuiz.action'

import Pagination from '../common/pagination.component'

import quizQuestions from '../../api/quizQuestions.api';
import Quiz from './quiz.component'
import Pager from './pager.component'
import QuizQuestionIndex from './quiz-question-index.component'
import CustomTimer from '../timer/custom-timer.component'
import CountDownTimer from '../timer/timer.component'
import QuizQuestionList from './quiz-question-list.component'

import './exam.css'


class ExamPage extends React.Component {

    // we need an initial state to populate the data
    constructor(props) {
        super(props);

        this.state = {
            counter: 0,
            questionId: 1,
            question: '',
            answerOptions: [],
            answer: '',
            answersCount: {
                nintendo: 0,
                microsoft: 0,
                sony: 0
            },
            result: '',
            disableBtnPrev: false,
            questions: null,
            exampleItems: null,
            pageOfItems: [],
            start_time: Date.now() 
        };

        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);

     
        // this.handleJumpIndexClick = this.handleJumpIndexClick.bind(this);

         this.onChangePage = this.onChangePage.bind(this);

    }


    // componentWillMount is react life cycle event
    // and we populate the state of the app when component will be rendered for the first time

    // The componentWillMount life cycle event is invoked once, both on the client and server, 
    // immediately before the initial rendering occurs

    componentWillMount() {

    }

    
    componentWillReceiveProps = (new_props) => {
        this.setState({
            questions: new_props.quizQuestions
        });
    }

    componentDidMount() {
        this.props.getExamQuestions();
    }

    setUserAnswer(answer) {
        const updatedAnswersCount = update(this.state.answersCount, {
            [answer]: { $apply: (currentValue) => currentValue + 1 }
        });
        this.setState({
            answersCount: updatedAnswersCount,
            answer: answer
        });
    }

    handleAnswerSelected(event) {
        this.setUserAnswer(event.currentTarget.value);
        if (this.state.questionId <= quizQuestions.length) {
            setTimeout(() => this.setNextQuestion(), 300);
        } else {

        }
    }



     onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });


        let new_time =  Date.now() + 7200000 - this.state.start_time;
        console.log('new time',this.state.start_time) 


        this.setState({ start_time: new_time });
    }
 


    handleJumpIndexClick(id) {
        alert(id)
    }

    renderQuestionJumpIndex = () => (
        this.props.quizQuestions.map((question,idx) => {
            return <li onClick={this.handleJumpIndexClick.bind(this,question.Question.QuestionId)} className=''><span>{idx + 1}</span></li>
        })
    )


    render() {

        return (
            <div>
              
                {/*<CustomTimer start={this.state.start_time} />*/}
                <CountDownTimer />
                <div className="container quiz-container">
                    <div className="row clearfix">
                        <div className="col-md-8">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <p>Exam Set for Software Engineer</p>
                                </div>
                                <div className="panel-body">
                                    
                                   {
                                        this.state.pageOfItems ?
                                        <QuizQuestionList questions={this.state.pageOfItems} /> :
                                        <p>No questions found</p>
                                   }

                                    <div className="pager">
                                        <Pagination items={this.props.quizQuestions} onChangePage={this.onChangePage} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div id="scorecard" className="menu">
                                <ul>
                                    { this.renderQuestionJumpIndex() }

                                    {/*<li className="">1</li>
                                    <li className="">2</li>
                                    <li className="">3</li>
                                    <li className="">4</li>
                                    <li className="currQue">5</li>
                                    <li className="currQue">6</li>
                                    <li className="currQue">7</li>
                                    <li className="currQue">8</li>
                                    <li className="">1</li>
                                    <li className="">2</li>
                                    <li className="">3</li>
                                    <li className="">4</li>*/}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }


}


const mapStateToProps = (state, props) => {
    return {
        quizQuestions: state.quizReducer.questions
    }
}



export default connect(mapStateToProps, { getExamQuestions })(ExamPage);