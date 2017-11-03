import React from 'react'

import RawHtml from "react-raw-html"

// we didn't use class because this is a presentational stateless component

// React has a popular pattern to divide the component into two: presentational and container
// Container component are responsible for how things work and presentational component are 
// mainly used for how things look in the application


class QuestionComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null
        }

        this.handleMarksChange = this.handleMarksChange.bind(this);
    }

    validateAnswer(answerVal) {
        if(answerVal === ''){
            return true;
        }
        var re = new RegExp("(^[0-9]\.[0-9]*$)|(^[0-9])");
        return re.test(answerVal);
    }

    handleMarksChange(e) {

        var regTestResult = this.validateAnswer(e.target.value);

        if (regTestResult) {
            if (e.target.value > this.props.questionInfo.Question.Marks) {
                this.setState({
                    error: "You can't give marks more than the full marks of the question."
                });
            }else {
                this.setState({
                    error: null
                });
            }
        } else {
            this.setState({
                error: "Only positive and numeric values are allowed."
            });
        }


        console.log('test result', regTestResult);
        console.log(e.target.value);
        console.log(this.props.questionInfo.Question.Marks)

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
                            Marks : <input type="text" onChange={this.handleMarksChange} />
                            <span className="error-message">{this.state.error ? this.state.error : null}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


export default QuestionComponent;