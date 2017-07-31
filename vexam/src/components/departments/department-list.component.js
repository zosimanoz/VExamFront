import React from 'react';

const DepartMentList = (props) => {

    const EmptyMessage = (
        <p>There are no departments added yet. </p>
    )


    const RenderDepartmentTable = (
        <div className="clearfix">
            <table className="table table-bordered table-condensed table-hover crud-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Code</th>
                        <th>Name</th>
                        <th>IsActive</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="form-list-client-body">
                    {
                        props.departments.map((item) =>
                            <tr>
                                <td>{item.DepartmentId}</td>
                                <td>{item.DepartmentCode}</td>
                                <td>{item.DepartmentName}</td>
                                <td>{item.Deleted === false ? 'active' : 'deleted'}</td>
                                <td>
                                    <a title="View" className="btn btn-default btn-sm "> <i className="glyphicon glyphicon-eye-open text-success"></i> </a>
                                    <a href="#" title="Edit" className="btn btn-default btn-sm "> <i className="glyphicon glyphicon-edit text-primary"></i> </a>
                                    <a title="Delete" className="btn btn-default btn-sm "> <i className="glyphicon glyphicon-trash text-danger"></i> </a>
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

export default DepartMentList;