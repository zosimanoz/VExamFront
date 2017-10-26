import React from 'react';

import { NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

const JobList = (props) => {
    const EmptyMessage = (
        <p>There are no Jobs added yet. </p>
    )
    const RenderJobTable = (
        <div className="clearfix">
            <table className="table table-bordered table-condensed table-hover crud-table">
                <thead>
                    <tr>
                        <th>S.N</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="form-list-client-body">
                    {
                        props.jobTypes.map((item, i) =>
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.JobTitle}</td>
                                <td>{item.Description}</td>
                                <td>
                                    {/*<a title="View" className="btn btn-default btn-sm "> <i className="glyphicon glyphicon-eye-open text-success"></i> </a>*/}
                                    <NavLink to={`/admin/job/${item.JobTitleId}`} className="btn btn-default btn-sm"><i className="glyphicon glyphicon-edit text-primary"></i></NavLink>
                                    <a title="Delete" className="btn btn-default btn-sm " onClick={() => confirmAlert({
                                        title: 'Confirm.',                        // Title dialog
                                        message: 'Are you sure to delete?',               // Message dialog
                                        confirmLabel: 'Confirm',                           // Text button confirm
                                        cancelLabel: 'Cancel',                             // Text button cancel
                                        onConfirm: () => props.deleteJobType(item.JobTitleId) // Action after Confirm
                                        // Action after Cancel
                                    })}> <i className="glyphicon glyphicon-trash text-danger"></i> </a>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )

    return (
        <div>
            {props.jobTypes.length === 0 ? EmptyMessage : RenderJobTable}
        </div>
    )
}

export default JobList;