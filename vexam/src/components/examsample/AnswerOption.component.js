import React from 'react'

import { API_URL } from '../../utils/url';


class AnswerOption extends React.Component {

    constructor(props) {
        super(props);
    }

    renderAttachment = () => {
        return (<div className="option-img">
            <img src={API_URL + this.props.attachment} />
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
                    onChange={this.props.saveObjectiveAnswer}
                    checked={this.props.isChecked}
                />

                {this.props.answerContent ? this.props.answerContent : ''}
                {this.props.attachment ? this.renderAttachment() : ''}
            </li>
        )
    }




}


export default AnswerOption;