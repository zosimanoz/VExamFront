import React from 'react';
import { Panel } from 'react-bootstrap';
import classnames from 'classnames';
import { Redirect, match, matchPath, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import RawHtml from "react-raw-html"

import theme from 'react-quill/dist/quill.snow.css';

import Loader from '../loader/loader.component';

import { fetchAllAnswersheetByIntervieweeId } from '../../actions/checkAnswer.action';


class AllQuestions extends React.Component {
    constructor(props) {
        super(props);
    }


    EmptyMessage() {
        return (
            <div className="clearfix">
                No answers found
            </div>
        )
    }

    RenderAnswersheetTable(props) {

        return (
            <div className="clearfix ScrollStyle">
                <table className="table table-bordered table-condensed table-hover">
                    <thead>
                        <tr>
                            <th>S.N</th>
                            <th>Title</th>
                            <th>Marks</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="form-list-client-body">
                        {
                            this.props.listQuestions.map((item, i) =>
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td><RawHtml.span>{item.Question.Question}</RawHtml.span></td>
                                    <td>{item.Question.Marks}</td>
                                    <td></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }


    render() {
        if (this.props.loader.loading) {
            return (
                <Loader loading={this.props.loader.loading} />
            );
        }

        let questionListComponent;
        if (this.props.listQuestions && this.props.listQuestions.length > 0) {
            questionListComponent = this.RenderAnswersheetTable()
        } else {
            questionListComponent = this.EmptyMessage()
        }
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    {questionListComponent}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    if (props.match.params.id) {
        return {
            //   questionList: state.answersheetReducer.answersheet,
            loader: state.loaderReducer
        }
    }
    return {
        // questionList: null,
        loader: state.loaderReducer
    }
}


export default connect(mapStateToProps, { fetchAllAnswersheetByIntervieweeId })(AllQuestions
);