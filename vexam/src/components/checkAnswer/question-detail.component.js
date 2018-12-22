import React from 'react'

import RawHtml from "react-raw-html"
import { connect } from 'react-redux'
import { assignMarks } from "../../actions/checkAnswer.action"
// we didn't use class because this is a presentational stateless component

// React has a popular pattern to divide the component into two: presentational and container
// Container component are responsible for how things work and presentational component are 
// mainly used for how things look in the application

import store from '../../store/index.store';
class QuestionComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null
        }
        this.handleMarksChange = this.handleMarksChange.bind(this);
    }

    validateAnswer(answerVal) {
        if (answerVal === '') {
            return true;
        }
        if (parseInt(answerVal) < 0){
            return false;
        }
        var re = new RegExp("(^\.[0-9]*$|^[0-9]\.[0-9]*$)|(^[0-9])");
        return re.test(answerVal);
    }

    handleMarksChange = (setQuestionId) => (e) => {

        const str = e.target.value
     
        var regTestResult = this.validateAnswer(str);

        // var regTestResult = this.validateAnswer(e.target.value);

        if (regTestResult) {
            if (e.target.value > this.props.questionInfo.Question.Marks) {
                this.setState({
                    error: "You can't give marks more than the full marks of the question."
                });
            } else {
                this.setState({
                    error: null
                });


                const newOptions = this.props.listSubjectiveQuestions.map((item, qid) => {
                    if (setQuestionId !== item.Question.SetQuestionId) {
                        return item
                    } else {
                        item.Question.MarksObtained = e.target.value;
                        // item.Question.ExaminerId = this.props.user.UserId;
                        return item
                    }
                });
                console.log('new options', newOptions);
                this.setState({ listSubjectiveQuestions: newOptions });
            }
        } else {
            this.setState({
                error: "Only positive and numeric values are allowed."
            });
        }

        // if (e.target.value > this.props.questionInfo.Question.Marks) {
        //     this.setState({
        //         error: "You can't give marks more than the full marks of the question."
        //     })
        // } else if (e.target.value < 0) {
        //     this.setState({
        //         error: "You can't give negative marks to the question."
        //     })
        // } else {
        //     this.setState({
        //         error: null
        //     })
        // }

    }

    render() {
        return (
            <div className="clearfix">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="div-subjective-question-detail pull-left">
                            <RawHtml.span>
                                {this.props.questionInfo.Question.Question}
                            </RawHtml.span>

                        </div>
                        <div className="pull-right span-question-marks">Marks : {this.props.questionInfo.Question.Marks}</div>
                        <div className="clearboth div-answer"> <span className="span-question-index"><b> => </b></span> <RawHtml.span> {this.props.questionInfo.Question.subjectiveAnswer}</RawHtml.span></div>

                        <div>
                            Marks : <input
                                name="MarksObtained"
                                type="text"
                                value={this.props.questionInfo.Question.MarksObtained == 0 ? '' : this.props.questionInfo.Question.MarksObtained}
                                onChange={
                                    this.handleMarksChange(this.props.questionInfo.Question.SetQuestionId)
                                }
                            />
                            <span className="error-message">{this.state.error ? this.state.error : null}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state, props) => {
    return {
        user: state.authReducer.user
    }
}



export default connect(mapStateToProps, { assignMarks })(QuestionComponent);

