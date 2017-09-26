import React from 'react';

import { NavLink } from 'react-router-dom';

const ActiveInterviewSessionList = (props) => {

    const EmptyMessage = (
        <p>There are no interview session added yet. </p>
    )


    const RenderActiveInterviewSessionTable = (
        <div className="clearfix">
            <table className="table table-bordered table-condensed table-hover crud-table">
                <thead>
                    <tr>
                        <th>S.N</th>
                        <th>Title</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th colSpan="2">Action</th>

                    </tr>
                </thead>
                <tbody id="form-list-client-body">
                    {
                        props.interviewSessions.map((item, i) =>
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.Title}</td>
                                <td>{item.SessionStartDate}</td>
                                <td>{item.SessionEndDate}</td>
                                <td>
                                    <NavLink title="Manage Job Vacancies" to={`/admin/interviewsession/${item.InterviewSessionId}/jobs`} className="btn btn-default btn-sm"><i className="glyphicon glyphicon-plus text-success"></i></NavLink>
                                    <NavLink title="Add Interviewees" to={`/admin/interviewSession/${item.InterviewSessionId}/interviewees`} className="btn btn-default btn-sm"><i className="glyphicon glyphicon-user text-primary"></i></NavLink>
                                </td>
                                <td>
                                    <NavLink title="Edit Session" to={`/admin/interviewSession/${item.InterviewSessionId}`} className="btn btn-default btn-sm"><i className="glyphicon glyphicon-edit text-primary"></i></NavLink>
                                    <a title="Delete" className="btn btn-default btn-sm " onClick={()=>props.deleteInterviewSession(item.InterviewSessionId)} > <i className="glyphicon glyphicon-trash text-danger"></i> </a>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
    console.log(props);
    return (
        <div>
            {RenderActiveInterviewSessionTable}
        </div>
    )
}

export default ActiveInterviewSessionList;