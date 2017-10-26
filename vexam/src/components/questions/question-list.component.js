import React from 'react';

import { NavLink } from 'react-router-dom';
import { Accordion, Panel } from 'react-bootstrap';
import RawHtml from "react-raw-html"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


const QustionsList = (props) => {

    const EmptyMessage = (
        <p>There are no question added yet. </p>
    )


    const RenderQuestionTable = (
        <div className="clearfix">
            <table className="table table-bordered table-condensed table-hover crud-table">
                <thead>
                    <tr>
                        <th>S.N</th>
                        <th>Title</th>
                        <th>Marks</th>
                        <th>Question Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="form-list-client-body">
                    {
                        props.questions.map((item,i) =>
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td><RawHtml.span>{item.Question}</RawHtml.span></td>
                                <td>{item.Marks}</td>
                                <td>{item.QuestionTypeName}</td>
                                <td>
                                    {/*<a title="View" className="btn btn-default btn-sm "> <i className="glyphicon glyphicon-eye-open text-success"></i> </a>*/}
                                    <NavLink to={`/admin/question/${item.QuestionId}`} className="btn btn-default btn-sm"><i className="glyphicon glyphicon-edit text-primary"></i></NavLink>
                                     <a title="Delete" className="btn btn-default btn-sm " onClick={() => confirmAlert({
                                        title: 'Confirm.',                       
                                        message: 'Are you sure to delete?',        
                                        confirmLabel: 'Confirm',                   
                                        cancelLabel: 'Cancel',                     
                                        onConfirm: () =>props.deleteQuestion(item.QuestionId)
                                        
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
            {props.questions.length === 0 ? EmptyMessage : RenderQuestionTable}
        </div>
    )
}

export default QustionsList;