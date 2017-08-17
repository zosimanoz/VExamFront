import React from 'react';
import { Panel } from 'react-bootstrap';

import classnames from 'classnames';
import { Redirect, match, matchPath } from 'react-router-dom';

import { connect } from 'react-redux';

import { Pagination } from 'react-bootstrap'

import ReactQuill from 'react-quill';
import theme from 'react-quill/dist/quill.snow.css';

// import ListPagination from '../common/pagination.component';

import { filterQuestionForExamSet } from '../../actions/questions.action'

import { fetchQuestionCategoryList } from '../../actions/questionCategory.action'
import { fetchQuestionComplexityList } from '../../actions/questionComplexity.action'

import { allAddedInExamSet,saveExamSetQuestions } from '../../actions/examset.action'

import QuestionList from './questionList.component'




class ExamQuestions extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        QuestionTypeId: '0',
        QuestionCategoryId: '0',
        JobTitleId: '0',
        QuestionComplexityId: '0',
        Question: '',
        errors: {},
        loading: false,
        done: false,
        selectedQuestions : [],
        checked: []
    }


    componentDidMount() {
        const { QuestionTypeId, QuestionCategoryId, JobTitleId, QuestionComplexityId, Question } = this.state;
        this.props.filterQuestionForExamSet({ QuestionTypeId, QuestionCategoryId, JobTitleId, QuestionComplexityId, Question });
        this.props.fetchQuestionCategoryList();
        this.props.fetchQuestionComplexityList();
    }



    onSetPage = (page) => {
        //this.props.onSetPage(this.props.fetchQuestionSets, page);
    }

    EmptyMessage() {
        return (
            <tr>
                <td colSpan="5">No records found</td>
            </tr>
        )
    }

    handleAddButtonClick = (idx,e) => {
        let question = {
            QuestionId : idx
        };

        this.setState({
            selectedQuestions: this.state.selectedQuestions.concat([question])
        });

    }


    RenderQuestionList() {
        return (
            this.props.questionsList.map((question, idx) => (
                <QuestionList {...question} />
            ))
        )
    }


    handleChange = (e) => {

        this.setState({ [e.target.name]: e.target.value }, function () {
            const { QuestionTypeId, QuestionCategoryId, JobTitleId, QuestionComplexityId, Question } = this.state;
            this.props.filterQuestionForExamSet({ QuestionTypeId, QuestionCategoryId, JobTitleId, QuestionComplexityId, Question });
        });

    }


    handleSelectAll = () => {
        const { questionList, isInExamSet } = this.props;

        // console.log(this.props)

        // if (allAddedInExamSet) {
        //     deleteQuestionFromExamSet(QuestionId);
        // } else {
        //     addQuestionToExamSet(QuestionId);
        // }
    }



    renderQuestionList() {

        return (
            <tbody>
                <tr>
                    <th></th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Complexity</th>
                    <th>Question Type</th>
                </tr>
                <tr>
                    <td>
                        {/*{console.log('allitemtest',allAddedInExamSet ? '1' : '0')}
                          <td><button className={allAddedInExamSet ? 'btn btn-primary btn-xs' : 'btn btn-danger btn-xs' } type="button" onClick={this.handleSelectAll}>{allAddedInExamSet ? '+': 'x'}</button></td>*/}
                    </td>
                    <td>
                        <input type="text"
                            className="form-control" />
                    </td>
                    <td>
                        <select name="QuestionCategoryId" className="form-control" onChange={this.handleChange.bind(this)}>
                            <option value="0">--Select Category--</option>
                            {this.props.categoryList.map((category, idx) => (
                                <option value={category.QuestionCategoryId}>{category.CategoryName}</option>
                            ))}

                        </select>
                    </td>
                    <td>
                        <select name="QuestionComplexityId" className="form-control" onChange={this.handleChange.bind(this)}>
                            <option value="0">--Select Complexity--</option>
                            {this.props.complexityList.map((complexity, idx) => (
                                <option value={complexity.QuestionComplexityId}>{complexity.ComplexityTitle}</option>
                            ))}
                        </select>
                    </td>
                    <td>
                        <select name="QuestionTypeId" className="form-control" onChange={this.handleChange}>
                            <option value="0">--Select Type--</option>
                            <option value="1">Subjective</option>
                            <option value="2">Objective</option>
                        </select>
                    </td>
                </tr>

                {this.props.questionsList.length === 0 ? this.EmptyMessage() : this.RenderQuestionList()}
          
            </tbody>
        )
    }


    handleSaveBtnClick = (e) => {
        e.preventDefault();
        const { setQuestions } = this.props.examsets;

        let QuestionsForSet = [];
        setQuestions.map((questionId,idx)=> {
            let data = {
                QuestionId: questionId,
                ExamSetId: this.props.match.params.id,
                CreatedBy: 2
            }

            QuestionsForSet.push(data);
        })

            
        this.props.saveExamSetQuestions( { QuestionsForSet } )
                .then(() => { 
                    this.setState({ done: true }); 
                    this.setState({ loading: false }) 
                },
                (err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
            );
    }




    renderForm() {
        return (
            <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleFormSubmit}>

                <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className={classnames('field')}>
                        <table className="table table-responsive table-hover table-bordered">
                            {this.renderQuestionList()}
                        </table>
                    </div>
                </div>



                <div className="clearfix"></div>

                <div className="btn-form-margin-top div-add-question">
                    <button className="btn btn-success btn-sm" onClick={this.handleSaveBtnClick}>Save</button>
                    <button className="btn btn-danger btn-sm btn-right-margin" type="button">Cancel</button>
                </div>
            </form>
        )
    }

    render() {



        return (
            <Panel header={this.props.heading}>
                {this.renderForm()}
            </Panel>
        )
    }
}



const mapStateToProps = (state,props) => {
    return ({
        questionsList: state.questions,
        categoryList: state.questionCategories,
        complexityList: state.questionComplexities,
        questionTypeList: state.questionTypes,
        allAddedInExamSet: allAddedInExamSet(state, props),
        examsets: state.examsets
    })
}



export default connect(mapStateToProps, { filterQuestionForExamSet, fetchQuestionCategoryList, fetchQuestionComplexityList,saveExamSetQuestions })(ExamQuestions);