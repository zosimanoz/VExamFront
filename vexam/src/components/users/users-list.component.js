import React from 'react';

import { NavLink } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


const UsersList = (props) => {

    const EmptyMessage = (
        <p>There are no departments added yet. </p>
    )


    const RenderUsersTable = (
        <div className="clearfix">
            <table className="table table-bordered table-condensed table-hover crud-table">
                <thead>
                    <tr>
                        <th>S.N</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="form-list-client-body">
                    {
                        props.users.map((item, i) =>
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.FirstName}</td>
                                <td>{item.LastName}</td>
                                <td>{item.EmailAddress}</td>
                                <td>{item.DepartmentName}</td>
                                <td>{item.RoleTitle}</td>
                                <td>
                                    {/*<NavLink to={`/admin/user/${item.UserId}`} className="btn btn-default btn-sm"><i className="glyphicon glyphicon-edit text-primary"></i></NavLink>*/}
                                    <a title="Delete" className="btn btn-default btn-sm " onClick={() => confirmAlert({
                                        title: 'Confirm to Delete',                        // Title dialog
                                        message: 'Are you sure to delete?',               // Message dialog
                                        confirmLabel: 'Confirm',                           // Text button confirm
                                        cancelLabel: 'Cancel',                             // Text button cancel
                                        onConfirm: () => props.deleteUserById(item.UserId)  // Action after Confirm
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
            {props.users.length === 0 ? EmptyMessage : RenderUsersTable}
        </div>
    )
}

export default UsersList;