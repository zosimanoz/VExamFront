import React from 'react';
import { Panel } from 'react-bootstrap';
import classnames from 'classnames';
import { Redirect, match, matchPath, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import theme from 'react-quill/dist/quill.snow.css';
import Loader from '../loader/loader.component';
import { fetchIntervieweesBySessionId } from '../../actions/interviewee.action';


class Interviewees extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = (props) => {
        if (this.props.match.params.id) {
            this.props.fetchIntervieweesBySessionId(this.props.match.params.id);
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
                    <NavLink to={`/admin/interviewsession/history`} ><span>&larr; Back &nbsp;</span></NavLink>
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


export default connect(mapStateToProps, { fetchIntervieweesBySessionId })(Interviewees);