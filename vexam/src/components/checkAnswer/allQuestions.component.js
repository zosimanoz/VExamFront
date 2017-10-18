import React from 'react';
import { Panel } from 'react-bootstrap';
import classnames from 'classnames';
import { Redirect, match, matchPath, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import RawHtml from "react-raw-html"

import theme from 'react-quill/dist/quill.snow.css';

import { fetchAllAnswersheetByIntervieweeId} from '../../actions/checkAnswer.action';


class AllQuestions extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = (props) => {
       if (this.props.match.params.id) {
            this.props.fetchAllAnswersheetByIntervieweeId(this.props.match.params.id);
        }
    }

    EmptyMessage() {
        return (
            <div className="clearfix">
                <table className="table table-bordered table-condensed table-hover">
                    <thead>
                        <tr>
                            <th>S.N</th>
                            <th>JobTitle</th>
                            <th>Exam Set Title</th>
                            
                        </tr>
                    </thead>
                    <tbody >
                        <tr>
                            <td colSpan="3">There are no job vacancies added in this session.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    RenderAnswersheetTable() {
        return (
        <div className="clearfix">
          {
                        this.props.questionList.map((item,i) =>
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td><RawHtml.span>{item.Question.Question}</RawHtml.span></td>
                                <td>{item.Question.Marks}</td>
                            </tr>
                        )
            }
        </div>
    )
}


    render() {
        let sessionjobListComponent;
        if (this.props.questionList) {
            sessionjobListComponent = this.RenderAnswersheetTable()
        } else {
            sessionjobListComponent = this.EmptyMessage()
        }
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <NavLink to={`/admin/interviewsession/history`} ><span>&larr; Back &nbsp;</span></NavLink>
                    <span> {this.props.heading}</span>
                </div>
                <div className="panel-body">
                {sessionjobListComponent}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    console.log('state...',state);
      if (props.match.params.id) {
        return {
            questionList: state.answersheetReducer.answersheet
            
        }
    }
    return {
        questionList: null
    }
}


export default connect(mapStateToProps, { fetchAllAnswersheetByIntervieweeId})(AllQuestions
);