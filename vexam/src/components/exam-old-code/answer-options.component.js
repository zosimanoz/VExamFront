import React from 'react'

URL = 'http://localhost:5000';

class AnswerOption extends React.Component {

    constructor(props) {
        super(props);
    }


 

    renderAttachment = () => {
        return (<div className="option-img">
            <img src={URL + this.props.attachment} />
        </div>)
    }

    render() {
        return (
            <li className="answerOption">
                <input
                    type="checkbox"
                    className="quizcheckBox"
                    name="checkBoxGroup"
                    id={this.props.answerType}
                    data-optionId = {this.props.optionId}
                    data-questionId={this.props.questionId}
                    value={this.props.optionId}
                    disabled={this.props.answer}
                    onChange={this.props.checkAnswer}
                    checked={this.props.isChecked}
                />

                {this.props.answerContent ? this.props.answerContent : ''}
                {this.props.attachment ? this.renderAttachment() : ''}
            </li>
        )
    }




}


// AnswerOption.propTypes = {
//     answerType: React.PropTypes.string.isRequired,
//     answerContent: React.PropTypes.string.isRequired,
//     answer: React.PropTypes.string.isRequired,
//     onAnswerSelected: React.PropTypes.func.isRequired
// };

export default AnswerOption;