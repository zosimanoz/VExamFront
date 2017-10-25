import React from 'react';

import { NavLink } from 'react-router-dom';

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
                                    <a title="Delete" className="btn btn-default btn-sm " onClick={() => props.deleteDepartment(item.DepartmentId)}> <i className="glyphicon glyphicon-trash text-danger"></i> </a>
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