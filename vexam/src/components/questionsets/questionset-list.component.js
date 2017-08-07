import React from 'react';

import { NavLink } from 'react-router-dom';
import { Accordion, Panel } from 'react-bootstrap';
import { Redirect, match, matchPath } from 'react-router-dom';




const QuestionSetList = (props) => {

    const EmptyMessage = (
        <p>There are no question sets added yet. </p>
    )


    const RenderQuestionTable = (
        <div className="clearfix">
            <table className="table table-bordered table-condensed table-hover crud-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>IsActive</th>
                        <th>Actions</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="form-list-client-body">
                    {
                        props.questionsets.map((item,i) =>
                            <tr key={i}>
                                <td>{item.QuestionSetId}</td>
                                <td>{item.Title}</td>
                                <td>{item.Deleted === false ? 'active' : 'deleted'}</td>
                                <td>
                                    <a title="View" className="btn btn-default btn-sm "> <i className="glyphicon glyphicon-eye-open text-success"></i> </a>
                                    <NavLink to={`/admin/questionset/${item.QuestionSetId}`} className="btn btn-default btn-sm"><i className="glyphicon glyphicon-edit text-primary"></i></NavLink>
                                    <a title="Delete" className="btn btn-default btn-sm "> <i className="glyphicon glyphicon-trash text-danger"></i> </a>
                                </td>
                                <td>
                                    <NavLink to={`/admin/questionset/${item.QuestionSetId}/questions`} title="Add questions" className="btn btn-default btn-sm"><i className="glyphicon glyphicon-plus text-danger"></i></NavLink>
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
            {props.questionsets.length === 0 ? EmptyMessage : RenderQuestionTable}
        </div>
    )
}

export default QuestionSetList;