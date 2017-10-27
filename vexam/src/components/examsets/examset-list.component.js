import React from 'react';

import { NavLink } from 'react-router-dom';
import { Accordion, Panel } from 'react-bootstrap';
import { Redirect, match, matchPath } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

const ExamSetList = (props) => {

    const EmptyMessage = (
        <p>There are no question sets added yet. </p>
    )


    const RenderExamSetTable = (

        <div className="clearfix">
            <table className="table table-bordered table-condensed table-hover crud-table">
                <thead>
                    <tr>
                        <th>S.N</th>
                        <th>Title</th>
                        <th>Set Questions</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="form-list-client-body">
                    {
                        props.examsets.map((item, i) =>
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.Title}</td>
                                <td>
                                    <NavLink to={`/admin/setquestions/${item.ExamSetId}`} title="View" className="btn btn-default btn-sm"><i className="glyphicon glyphicon-eye-open text-success"></i></NavLink>
                                     <NavLink to={`/admin/examsets/${item.ExamSetId}/questions`} title="Add questions" className="btn btn-default btn-sm"><i className="glyphicon glyphicon-plus text-danger"></i></NavLink>
                                </td>
                                <td>
                                    <NavLink to={`/admin/examsets/${item.ExamSetId}`} className="btn btn-default btn-sm"><i className="glyphicon glyphicon-edit text-primary"></i></NavLink>
                                     <a title="Delete" className="btn btn-default btn-sm " onClick={() => confirmAlert({
                                        title: 'Confirm.',                       
                                        message: 'Are you sure to delete?',        
                                        confirmLabel: 'Confirm',                   
                                        cancelLabel: 'Cancel',                     
                                        onConfirm: () => props.deleteExamSet(item.ExamSetId)
                                        
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
            {props.examsets.length === 0 ? EmptyMessage : RenderExamSetTable}
        </div>
    )
}

export default ExamSetList;