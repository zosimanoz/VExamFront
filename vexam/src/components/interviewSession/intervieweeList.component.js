import React from 'react';

import { NavLink } from 'react-router-dom';

const IntervieweeList = (props) => {



    const EmptyMessage = (
        <p>There are no interviewees added in this session. </p>
    )


    const RenderIntervieweeTable = (

        <div className="clearfix">
            <table className="table table-bordered table-condensed table-hover">
                 <thead>
                        <tr>
                            <th>S.N</th>
                            <th>Interviewee Name</th>
                            <th>Email Address</th>
                            <th>Contact Number</th>
                            <th>Job</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                <tbody id="form-list-client-body">
                    {
                        props.interviewees.map((item,i) =>
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{item.FullName}</td>
                                <td>{item.EmailAddress}</td>
                                 <td>{item.ContactNumber}</td>
                                 <td>{item.JobTitle}</td>
                                <td>
                                    <a title="Edit" className="btn btn-default btn-sm "onClick={()=>props.editInterviewee(item)} > <i className="glyphicon glyphicon-edit text-primary" ></i> </a>
                                    <a title="Delete" className="btn btn-default btn-sm " onClick={()=>props.deleteInterviewee(item.IntervieweeId)} > <i className="glyphicon glyphicon-trash text-danger"></i> </a>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
  {console.log('.....',props)}
    return (
        <div>
                {props.interviewees.length === 0 ? EmptyMessage : RenderIntervieweeTable}
            {/*{RenderSessionJobsTable}*/}
        </div>
    )
}

export default IntervieweeList;