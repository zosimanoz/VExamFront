import React, { Component } from 'react';
import { connect } from 'react-redux'

import {  addQuestionToExamSet, deleteQuestionFromExamSet, isInExamSet } from '../../actions/examset.action'

class QuestionList extends Component {
    handleClick = () => {
        const { QuestionId, addQuestionToExamSet, deleteQuestionFromExamSet, isInExamSet } = this.props;


        if (isInExamSet) {
            deleteQuestionFromExamSet(QuestionId);
        } else {
            addQuestionToExamSet(QuestionId);
        }
    }

    render() {
        const { QuestionId,Question,QuestionCategoryName,QuestionComplexityName, QuestionTypeName,isInExamSet } = this.props;
        return (
           <tr className="options" key={QuestionId}>
               <td></td>
                <td>{Question}</td>
                <td>{QuestionCategoryName}</td>
                <td>{QuestionComplexityName}</td>
                <td>{QuestionTypeName}</td>
                <td><button className={isInExamSet ? 'btn btn-danger' : 'btn btn-primary' } type="button" onClick={this.handleClick}>{isInExamSet ? 'x': '+'}</button></td>
           </tr>
        );
    }
}




const mapStateToProps = (state, props) => {
    return {
        isInExamSet: isInExamSet(state, props)
    }
}



export default connect(mapStateToProps, { addQuestionToExamSet, deleteQuestionFromExamSet })(QuestionList);
