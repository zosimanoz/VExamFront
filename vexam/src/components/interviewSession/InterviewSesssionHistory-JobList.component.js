import React from 'react';
import { Panel } from 'react-bootstrap';
import classnames from 'classnames';
import { Redirect, match, matchPath, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import theme from 'react-quill/dist/quill.snow.css';
import Loader from '../loader/loader.component';
import { fetchSessionJobBySessionId } from '../../actions/sessionJobs.action';


class SessionJobs extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = (props) => {
        if (this.props.match.params.id) {
            this.props.fetchSessionJobBySessionId(this.props.match.params.id);
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

    RenderSessionJobsTable() {
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
                    <tbody id="form-list-client-body">
                        {
                            this.props.sessionJobList.map((item, i) =>
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{item.JobTitle}</td>
                                    <td>{item.ExamSetTitle}</td>
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


        let sessionjobListComponent;
        if (this.props.sessionJobList) {
            sessionjobListComponent = this.RenderSessionJobsTable()
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
    if (props.match.params.id) {
        return {
            sessionJobList: state.sessionJobReducer.sessionJobList,
            loader: state.loaderReducer
        }
    }
    return {
        sessionJobList: null,
        loader: state.loaderReducer
    }
}


export default connect(mapStateToProps, { fetchSessionJobBySessionId })(SessionJobs);