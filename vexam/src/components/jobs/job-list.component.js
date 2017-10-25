import React from 'react';

import { NavLink } from 'react-router-dom';

const JobList = (props) => {
    const EmptyMessage = (
        <p>There are no Jobs added yet. </p>
    )

    // const handleCategoryDelete = (id) => {

    //     this.props.deleteQuestionCategory(id)
    //             .then(() => {
    //                 this.setState({ done: true });
    //                 this.setState({ loading: false })
    //             },
    //             (err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
    //             );
    // }


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
                                    <a title="Delete" className="btn btn-default btn-sm " onClick={() => props.deleteJobType(item.JobTitleId)}> <i className="glyphicon glyphicon-trash text-danger"></i> </a>

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