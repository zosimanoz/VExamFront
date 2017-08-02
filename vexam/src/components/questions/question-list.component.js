import React from 'react';

import { NavLink } from 'react-router-dom';
import { Accordion, Panel } from 'react-bootstrap';



const QustionsList = (props) => {

    const EmptyMessage = (
        <p>There are no question added yet. </p>
    )


    const RenderQuestionTable = (
        <div className="clearfix">
            <table className="table table-bordered table-condensed table-hover crud-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Marks</th>
                        <th>IsActive</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="form-list-client-body">
                    {
                        props.questions.map((item,i) =>
                            <tr key={i}>
                                <td>{item.QuestionId}</td>
                                <td>{item.Question}</td>
                                <td>{item.Marks}</td>
                                <td>{item.Deleted === false ? 'active' : 'deleted'}</td>
                                <td>
                                    <a title="View" className="btn btn-default btn-sm "> <i className="glyphicon glyphicon-eye-open text-success"></i> </a>
                                    <NavLink to={`/admin/question/${item.QuestionId}`} className="btn btn-default btn-sm"><i className="glyphicon glyphicon-edit text-primary"></i></NavLink>
                                    {/*<a href="#" title="Edit" className="btn btn-default btn-sm "> <i className="glyphicon glyphicon-edit text-primary"></i> </a>*/}
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
            {props.questions.length === 0 ? EmptyMessage : RenderQuestionTable}
        </div>
    )
}

export default QustionsList;