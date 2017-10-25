import React from 'react';

import { NavLink } from 'react-router-dom';

const QuestionCategoryList = (props) => {

    const EmptyMessage = (
        <p>There are no Categories added yet. </p>
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


    const RenderQuestionCategoryTable = (
        <div className="clearfix">
            <table className="table table-bordered table-condensed table-hover crud-table">
                <thead>
                    <tr>
                        <th>S.N</th>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="form-list-client-body">
                    {
                        props.questionCategories.map((item, i) =>
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.CategoryCode}</td>
                                <td>{item.CategoryName}</td>
                                <td>{item.Description}</td>
                                <td>
                                    <NavLink to={`/admin/categories/${item.QuestionCategoryId}`} className="btn btn-default btn-sm"><i className="glyphicon glyphicon-edit text-primary"></i></NavLink>
                                    <a title="Delete" className="btn btn-default btn-sm " onClick={() => props.deleteQuestionCategories(item.QuestionCategoryId)}> <i className="glyphicon glyphicon-trash text-danger"></i> </a>

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
            {props.questionCategories.length === 0 ? EmptyMessage : RenderQuestionCategoryTable}
        </div>
    )
}

export default QuestionCategoryList;