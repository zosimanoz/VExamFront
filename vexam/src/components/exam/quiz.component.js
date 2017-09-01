import React from 'react'
import QuestionCount from './question-count.component'
import Question from './question.component'
import AnswerOption from './answer-options.component'





const Quiz = (props) => {

/* 
    const renderAnswerOptions = (key) => {
        return (
            <AnswerOption
                key={key.content}
                answerContent={key.content}
                answerType={key.type}
                questionId={props.questionId}
                onAnswerSelected={props.onAnswerSelected}
                />
        );
    }*/


    return (


        <div className="quiz">
            {/*<QuestionCount
                counter={props.questionId}
                total={props.questionTotal} />*/}


            <Question content={props.question} />

            {/*<ul className="answerOptions">
                {props.answerOptions.map(renderAnswerOptions)}
            </ul>*/}
        </div>
    )
}


// Quiz.propTypes = {
//     answerOptions: React.PropTypes.array.isRequired,
//   //  counter: React.PropTypes.number.isRequired,
//     question: React.PropTypes.string.isRequired,
//     questionId: React.PropTypes.number.isRequired,
//     questionTotal: React.PropTypes.number.isRequired,
//     onAnswerSelected: React.PropTypes.func.isRequired
// };

export default Quiz;

