import React from 'react';

import { NavLink } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

const QuestionComplexityList = (props) => {

    const EmptyMessage = (
        <p>There are no Question Complexities added yet. </p>
    )

    const RenderQuestionComplexityTable = (
        <div className="clearfix">
            <table className="table table-bordered table-condensed table-hover crud-table">
                <thead>
                    <tr>
                        <th>S.N</th>
                        <th>Code</th>
                        <th>Title</th>
                        <th>Marks</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="form-list-client-body">
                    {
                        props.questionComplexities.map((item, i) =>
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.ComplexityCode}</td>
                                <td>{item.ComplexityTitle}</td>
                                <td>{item.Marks}</td>
                                <td>
                                    <NavLink to={`/admin/complexity/${item.QuestionComplexityId}`} className="btn btn-default btn-sm"><i className="glyphicon glyphicon-edit text-primary"></i></NavLink>
                                    <a title="Delete" className="btn btn-default btn-sm " onClick={() => confirmAlert({
                                        title: 'Confirm.',                        // Title dialog
                                        message: 'Are you sure to delete?',               // Message dialog
                                        confirmLabel: 'Confirm',                           // Text button confirm
                                        cancelLabel: 'Cancel',                             // Text button cancel
                                        onConfirm: () => props.deleteQuestionComplexities(item.QuestionComplexityId) // Action after Confirm
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
            {props.questionComplexities.length === 0 ? EmptyMessage : RenderQuestionComplexityTable}
        </div>
    )
}

export default QuestionComplexityList;