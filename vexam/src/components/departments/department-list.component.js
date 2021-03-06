import React from 'react';

import { NavLink } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


const DepartmentList = (props) => {

    const EmptyMessage = (
        <p>There are no departments added yet. </p>
    )


    const RenderDepartmentTable = (
        <div className="clearfix">
            <table className="table table-bordered table-condensed table-hover crud-table">
                <thead>
                    <tr>
                        <th>S.N</th>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="form-list-client-body">
                    {
                        props.departments.map((item, i) =>
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.DepartmentCode}</td>
                                <td>{item.DepartmentName}</td>
                                <td>
                                    <NavLink to={`/admin/department/${item.DepartmentId}`} className="btn btn-default btn-sm"><i className="glyphicon glyphicon-edit text-primary"></i></NavLink>
                                    <a title="Delete" className="btn btn-default btn-sm " onClick={() => confirmAlert({
                                        title: 'Confirm to Delete',                        // Title dialog
                                        message: 'Are you sure to delete?',               // Message dialog
                                        confirmLabel: 'Confirm',                           // Text button confirm
                                        cancelLabel: 'Cancel',                             // Text button cancel
                                        onConfirm: () => props.deleteDepartment(item.DepartmentId)  // Action after Confirm
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
            {props.departments.length === 0 ? EmptyMessage : RenderDepartmentTable}
        </div>
    )
}

export default DepartmentList;