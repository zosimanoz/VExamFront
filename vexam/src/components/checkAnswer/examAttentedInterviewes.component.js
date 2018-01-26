import React from 'react';
import { Panel } from 'react-bootstrap';
import classnames from 'classnames';
import { Redirect, match, matchPath, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from '../loader/loader.component';
import theme from 'react-quill/dist/quill.snow.css';

import { fetchExamAttendedIntervieweesBySessionId } from '../../actions/interviewee.action';


class ExamAttendedInterviewee extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = (props) => {
        if (this.props.match.params.id) {
            this.props.fetchExamAttendedIntervieweesBySessionId(this.props.match.params.id);
        }
    }


    EmptyMessage() {
        return (
            <div className="clearfix">
                <table className="table table-bordered table-condensed table-hover">
                    <thead>
                        <tr>
                            <th>S.N</th>
                            <th>Interviewee Name</th>
                            <th>Email Address</th>
                            <th>Contact Number</th>
                            <th>Job</th>

                        </tr>
                    </thead>
                    <tbody >
                        <tr>
                            <td colSpan="5">There are no interviewees added in this session.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    RenderIntervieweeTable() {
        return (
            <div className="clearfix">
                <table className="table table-bordered table-condensed table-hover">
                    <thead>
                        <tr>
                            <th>S.N</th>
                            <th>Interviewee Name</th>
                            <th>Email Address</th>
                            <th>Contact Number</th>
                            <th>Job</th>
                            <th>Exam Set</th>
                            <th>Total Marks Obtained</th>
                        </tr>
                    </thead>
                    <tbody id="form-list-client-body">
                        {
                            this.props.intervieweeList.map((item, i) =>
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{item.FullName}</td>
                                    <td>{item.EmailAddress}</td>
                                    <td>{item.ContactNumber}</td>
                                    <td>{item.JobTitle}</td>
                                      <td>{item.ExamSetTitle}</td>
                                    <td>{item.TotalMarksObtained}</td>
                                    
                                    <td>
                                        <NavLink title="Answersheet" to={`/admin/interviewSessions/interviewees/${item.IntervieweeId}/answersheet`} className="btn btn-default btn-sm"><i className="glyphicon glyphicon-list text-primary"></i></NavLink>
                                    </td>
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

        let intervieweeListComponent;
        if (this.props.intervieweeList) {
            intervieweeListComponent = this.RenderIntervieweeTable()
        } else {
            intervieweeListComponent = this.EmptyMessage()
        }
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <NavLink to={`/admin/checkanswers`} ><span>&larr; Back &nbsp;</span></NavLink>
                    <span> {this.props.heading}</span>
                </div>
                <div className="panel-body">
                    {intervieweeListComponent}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    if (props.match.params.id) {
        return {
            intervieweeList: state.intervieweeReducer.intervieweeList,
            loader: state.loaderReducer
        }
    }
    return {
        intervieweeList: null,
        loader: state.loaderReducer
    }
}


export default connect(mapStateToProps, { fetchExamAttendedIntervieweesBySessionId })(ExamAttendedInterviewee);