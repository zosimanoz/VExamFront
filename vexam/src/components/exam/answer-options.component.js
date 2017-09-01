import React from 'react'


const AnswerOption = (props) => {
    return (
        <li className="answerOption">
            <input
                type="checkbox"
                className="quizcheckBox"
                name="checkBoxGroup"
                id={props.answerType}
                value={props.answerType}
                disabled={props.answer}
                onChange={props.onAnswerSelected}
                />
               {props.answerContent}
        </li>
    )
}


// AnswerOption.propTypes = {
//     answerType: React.PropTypes.string.isRequired,
//     answerContent: React.PropTypes.string.isRequired,
//     answer: React.PropTypes.string.isRequired,
//     onAnswerSelected: React.PropTypes.func.isRequired
// };

export default AnswerOption;