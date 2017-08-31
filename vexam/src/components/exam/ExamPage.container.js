import React from 'react'
import update from 'react-addons-update'

import { connect } from 'react-redux'


import { getExamQuestions } from '../../actions/examQuiz.action'

import quizQuestions from '../../api/quizQuestions.api';
import Quiz from './quiz.component'
import Pager from './pager.component'
import QuizQuestionIndex from './quiz-question-index.component'
import Timer from './timer.component'
import CountDownTimer from '../timer/timer.component'

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
            questions: null
        };

        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);

        this.handlePrevQuestion = this.handlePrevQuestion.bind(this);

        this.handleNextQuestion = this.handleNextQuestion.bind(this);

    }


    // componentWillMount is react life cycle event
    // and we populate the state of the app when component will be rendered for the first time

    // The componentWillMount life cycle event is invoked once, both on the client and server, 
    // immediately before the initial rendering occurs

    componentWillMount() {

        const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));

        this.setState({
            question: quizQuestions[0].question,
            answerOptions: shuffledAnswerOptions[0]
        });
    }

    
    componentWillReceiveProps = (new_props) => {
        this.setState({
            questions: new_props.quizQuestions
        });
    }

    componentDidMount() {
        this.props.getExamQuestions();
    }


    shuffleArray(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };


    setUserAnswer(answer) {
        const updatedAnswersCount = update(this.state.answersCount, {
            [answer]: { $apply: (currentValue) => currentValue + 1 }
        });
        this.setState({
            answersCount: updatedAnswersCount,
            answer: answer
        });
    }


    setNextQuestion() {
        let counter = this.state.counter + 1;
        let questionId = this.state.questionId + 1;
        this.setState({
            counter: counter,
            questionId: questionId,
            question: quizQuestions[counter].question,
            answerOptions: quizQuestions[counter].answers,
            answer: ''
        });
    }

    setPrevQuestion() {
        let counter = this.state.counter - 1;
        let questionId = this.state.questionId - 1;

        console.log('cunter', counter)

        if (counter <= 1) {
            counter = 1;
            questionId = 1;
            this.setState({
                counter: counter,
                questionId: questionId,
                question: quizQuestions[counter].question,
                answerOptions: quizQuestions[counter].answers,
                answer: '',
                disableBtnPrev: true
            });
        }
        this.setState({
            counter: counter,
            questionId: questionId,
            question: quizQuestions[counter].question,
            answerOptions: quizQuestions[counter].answers,
            answer: '',
            disableBtnPrev: false
        });


    }


    handleAnswerSelected(event) {
        this.setUserAnswer(event.currentTarget.value);
        if (this.state.questionId <= quizQuestions.length) {
            setTimeout(() => this.setNextQuestion(), 300);
        } else {

        }
    }

    handlePrevQuestion(event) {

        setTimeout(() => this.setPrevQuestion(), 300);

    }

    handleNextQuestion(event) {

        if (this.state.questionId < quizQuestions.length) {
            setTimeout(() => this.setNextQuestion(), 300);
        } else {

        }
    }

    renderQuiz() {
        
        if(this.props.quizQuestions){
            this.props.quizQuestions.map((question,idx) => {
                console.log(question)
            });
        }
      
    }

    render() {

        return (
            <div>
                <CountDownTimer />

                <div className="container quiz-container">
                    <div className="row clearfix">
                        <div className="col-md-8">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <p>Exam Set for Software Engineer</p>
                                </div>
                                <div className="panel-body">
                                    
                                    { this.renderQuiz() }
                                    <Quiz
                                        answer={this.state.answer}
                                        answerOptions={this.state.answerOptions}
                                        questionId={this.state.questionId}
                                        question={this.state.question}
                                        questionTotal={quizQuestions.length}
                                        onAnswerSelected={this.handleAnswerSelected}
                                    />

                                    <div className="pager">
                                        <Pager disableBtnPrev={this.state.disableBtnPrev} onPrevClick={this.handlePrevQuestion} onNextClick={this.handleNextQuestion} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div id="scorecard" className="menu">
                                <ul>
                                    <li className="">1</li>
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
                                    <li className="">4</li>
                                </ul>
                            </div>
                            {/*<QuizQuestionIndex />*/}
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