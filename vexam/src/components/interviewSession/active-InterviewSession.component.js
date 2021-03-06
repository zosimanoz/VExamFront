import React from 'react';

import Moment from 'react-moment';
// import 'moment-timezone';
import { NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

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
                                <td><Moment format="YYYY/MM/DD">{item.SessionStartDate}</Moment></td>
                                <td><Moment format="YYYY/MM/DD">{item.SessionEndDate}</Moment></td>
                               
                                <td>
                                    <NavLink title="Interviewees" to={`/admin/interviewSession/${item.InterviewSessionId}/interviewees`} className="btn btn-default btn-sm"><i className="glyphicon glyphicon-user text-primary"></i>&nbsp;&nbsp;Interviewee</NavLink>
                                    &nbsp;&nbsp;
                                    <NavLink title="Edit Session" to={`/admin/interviewSession/${item.InterviewSessionId}`} className="btn btn-default btn-sm"><i className="glyphicon glyphicon-edit text-primary"></i></NavLink>
                                    &nbsp;&nbsp;
                                    <a title="Delete" className="btn btn-default btn-sm " onClick={() => confirmAlert({
                                        title: 'Confirm.',                       
                                        message: 'Are you sure to delete?',        
                                        confirmLabel: 'Confirm',                   
                                        cancelLabel: 'Cancel',                     
                                        onConfirm: () => props.deleteInterviewSession(item.InterviewSessionId) 
                                        
                                    })}> <i className="glyphicon glyphicon-trash text-danger"></i> </a>
                                
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