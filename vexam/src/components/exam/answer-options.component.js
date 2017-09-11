import React from 'react'

URL = 'http://localhost:5000';

class AnswerOption extends React.Component {

    constructor(props) {
        super(props);

        
     //   this.onAnswerSelected = this.onAnswerSelected.bind(this);
    }

    state = {
            answers : []
    }

//     onAnswerSelected = (e) => {
//           console.log('selected nnnn',e.target.value)
//         console.log('question',e.target.getAttribute('data-questionId'))
 
//         e.preventDefault();
//         var newItem = {
//             questionId: e.target.getAttribute('data-questionId'),
//             optionId: e.target.value
//         };

//         console.log(newItem)
//         this.state.answers.push(newItem)
//         // this.setState({
//         //     answers: this.state.answers
//         // });
       
//  console.log(this.state)
        
//     }

 onAnswerSelected = (e) => {
         console.log('selected nnnn',e.target.value)
         console.log('question',e.target.getAttribute('data-questionId'));
                 e.preventDefault();
        var newItem = {
            questionId: e.target.getAttribute('data-questionId'),
            optionId: e.target.value
        };
        this.setState({ answers: this.state.answers.concat([newItem]) }); 
 }

 

    renderAttachment = () => {
        return (<div className="option-img">
            <img src={URL + this.props.attachment} />
        </div>)
    }

    render() {
         console.log('hhhh',this.state)
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
                    onChange={this.onAnswerSelected}
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