import React from 'react';
import { Panel } from 'react-bootstrap';

import classnames from 'classnames';
import { Redirect, match, matchPath, NavLink } from 'react-router-dom';

import { connect } from 'react-redux';

import { Pagination } from 'react-bootstrap'

import ReactQuill from 'react-quill';
import theme from 'react-quill/dist/quill.snow.css';

import RawHtml from "react-raw-html"

import { fetchSetQuestionsByExamSet } from '../../actions/examset.action'
import { API_URL } from '../../utils/url';

class SetQuestions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sum: 0
        }
    }


    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.fetchSetQuestionsByExamSet(this.props.match.params.id);
        }
    }

    EmptyMessage() {
        return (
            <tr>
                <td colSpan="5">No records found</td>
            </tr>
        )
    }


    renderSetQuestionList() {
        var sum = 0;
        this.props.setquestions.map((item, i) => 
            sum += parseInt(item.Marks)
        )

        return (
            <div>

                <table className="table table-bordered table-condensed table-hover crud-table">
                    <thead>
                        <tr>
                            <th>S.N</th>
                            <th>Question</th>
                            <th>Question Type</th>
                            <th>Category</th>
                            <th>Complexity</th>
                            <th>Marks</th>
                        </tr>
                    </thead>
                    <tbody id="form-list-client-body">
                        {
                            this.props.setquestions.map((item, i) =>
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>
                                        <RawHtml.span>{item.Question}</RawHtml.span>
                                        <br/>
                                        <img src= {item.Attachment == "" ? "" : API_URL + item.Attachment} style={{ float: 'left',width:'40%' }}/>
                                    </td>
                                    <td>{item.QuestionTypeName}</td>
                                    <td>{item.QuestionCategoryName} </td>
                                    <td>{item.QuestionComplexityName}</td>
                                    <td>{item.Marks}</td>
                                </tr>
                            )
                            
                        }
                        <tr>       
                            <td colSpan="4"></td>
                            <td colSpan="2">
                                <b>Total : {sum}</b>
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }


    render() {
        return (
            <Panel header={this.props.heading}>
                 <div className="pull-right">
                      <NavLink to={`/admin/examsets`} className="btn btn-default btn-sm btn-right-margin"><i className="glyphicons glyphicons-arrow-left"></i><span>Back</span></NavLink>
                </div>
                {this.props.examsets.setQuestionList == null ? this.EmptyMessage() : this.renderSetQuestionList()}
            </Panel>
        )
    }
}



const mapStateToProps = (state, props) => {
    console.log('setquestion', state.examsets.setQuestionList);
    return ({
        ...state,
        setquestions: state.examsets.setQuestionList,

    })
}



export default connect(mapStateToProps, { fetchSetQuestionsByExamSet })(SetQuestions);