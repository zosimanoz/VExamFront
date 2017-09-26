import React from 'react';

import { NavLink } from 'react-router-dom';

const SessionJobList = (props) => {



    const EmptyMessage = (
        <p>There are no job vacancies added in this session. </p>
    )


    const RenderSessionJobsTable = (

        <div className="clearfix">
            <table className="table table-bordered table-condensed table-hover">
                <thead>
                    <tr>
                        <th>S.N</th>
                        <th>JobTitle</th>
                        <th>Exam Set Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="form-list-client-body">
                    {
                        props.sessionJobs.map((item,i) =>
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{item.JobTitle}</td>
                                <td>{item.ExamSetTitle}</td>
                                <td>
                                    <a title="Edit" className="btn btn-default btn-sm "onClick={()=>props.editJob(item)} > <i className="glyphicon glyphicon-edit text-primary" ></i> </a>
                                    <a title="Delete" className="btn btn-default btn-sm " onClick={()=>props.deleteJob(item.SessionwiseJobId)} > <i className="glyphicon glyphicon-trash text-danger"></i> </a>
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
                {props.sessionJobs.length === 0 ? EmptyMessage : RenderSessionJobsTable}
            {/*{RenderSessionJobsTable}*/}
        </div>
    )
}

export default SessionJobList;