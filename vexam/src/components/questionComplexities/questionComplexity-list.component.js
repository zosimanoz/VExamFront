import React from 'react';

import { NavLink } from 'react-router-dom';

import { deleteQuestionComplexity } from '../../actions/questionComplexity.action';

const QuestionComplexityList = (props) => {

    const EmptyMessage = (
        <p>There are no Question Complexities added yet. </p>
    )

    const handleComplexityDelete = (id) => {
       
        this.props.deleteQuestionComplexity(id)
                .then(() => {
                    this.setState({ done: true });
                    this.setState({ loading: false })
                },
                (err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
                );
    }


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
                                <td>{i+1}</td>
                                <td>{item.ComplexityCode}</td>
                                <td>{item.ComplexityTitle}</td>
                                <td>{item.Marks}</td>
                                <td>
                                    {/*<a title="View" className="btn btn-default btn-sm "> <i className="glyphicon glyphicon-eye-open text-success"></i> </a>*/}
                                    <NavLink to={`/admin/complexity/${item.QuestionComplexityId}`} className="btn btn-default btn-sm"><i className="glyphicon glyphicon-edit text-primary"></i></NavLink>
                                    {/*<NavLink onClick={this.handleComplexityDelete(item.QuestionComplexityId)} className="btn btn-default btn-sm"><i className="glyphicon glyphicon-trash text-danger"></i></NavLink>*/}

                                  
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