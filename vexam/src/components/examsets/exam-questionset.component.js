import React from 'react';
import { Panel } from 'react-bootstrap';

import classnames from 'classnames';
import { Redirect, match, matchPath, NavLink } from 'react-router-dom';

import { connect } from 'react-redux';

import { Pagination } from 'react-bootstrap'

import ReactQuill from 'react-quill';
import theme from 'react-quill/dist/quill.snow.css';

// import ListPagination from '../common/pagination.component';

import { filterQuestionForExamSet } from '../../actions/questions.action'

import { fetchQuestionCategoryList } from '../../actions/questionCategory.action'
import { fetchQuestionComplexityList } from '../../actions/questionComplexity.action'

import { saveExamSetQuestions, fetchSetQuestionsByExamSet, addQuestionToExamSet, emptySetQuestionList } from '../../actions/examset.action'

import QuestionList from './questionList.component'


import store from '../../store/index.store';

class ExamQuestions extends React.Component {
    constructor(props, context) {
        super(props, context);
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
        selectedQuestions: [54],
        checked: []
    }


    componentDidMount() {
        const { QuestionTypeId, QuestionCategoryId, JobTitleId, QuestionComplexityId, Question } = this.state;
        this.props.filterQuestionForExamSet({ QuestionTypeId, QuestionCategoryId, JobTitleId, QuestionComplexityId, Question });
        this.props.fetchQuestionCategoryList();
        this.props.fetchQuestionComplexityList();
        this.props.fetchSetQuestionsByExamSet(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps) {
        // checkSetQuestins(nextProps);
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

    handleAddButtonClick = (idx, e) => {
        let question = {
            QuestionId: idx
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
        // const { questionList, isInExamSet } = this.props;

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
                            placeholder="keyword"
                            name="Question"
                            className="form-control"
                            onChange={this.handleChange.bind(this)} />
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
        setQuestions.map((questionId, idx) => {
            let data = {
                QuestionId: questionId,
                ExamSetId: this.props.match.params.id,
                CreatedBy: 2
            }

            QuestionsForSet.push(data);
        })


        this.props.saveExamSetQuestions({ QuestionsForSet })
            .then(() => {
                console.log('ajax success')
                this.setState({ done: true });
                this.setState({ loading: false })
            },
            (err) => {
                console.log(err);
                //err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
            }
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
                    <NavLink to={`/admin/examsets`} className="btn btn-danger btn-sm btn-right-margin"><span>Cancel</span></NavLink>
                </div>
            </form>
        )
    }

    render() {

        console.log('store', store)
        return (
            <Panel header={this.props.heading}>
                {this.state.done ? <Redirect to="/admin/examsets" /> : this.renderForm()}
            </Panel>
        )
    }
}

function checkSetQuestins(state) {
    // alert('foo');
    //  var setQuestionArrayList = props.examsets.setQuestionList;
    console.log('state', state);
    if (state.examsets.setQuestionList && state.examsets.setQuestions.length === 0) {
        state.examsets.setQuestionList.map((item, i) => {
            if (state.examsets.setQuestions.indexOf(item.QuestionId) === -1) {
                store.dispatch(addQuestionToExamSet(item.QuestionId));
            }
            // state.examsets.setQuestions = state.examsets.setQuestions.concat(item.QuestionId);

        })
        store.dispatch(emptySetQuestionList());
    }
}


const mapStateToProps = (state, props) => {
    checkSetQuestins(state);
    console.log('-->', state);
    return ({
        ...state,
        questionsList: state.questions.QuestionList,
        categoryList: state.questionCategories,
        complexityList: state.questionComplexities,
        questionTypeList: state.questionTypes,
        //allAddedInExamSet: allAddedInExamSet(state, props),
        examsets: state.examsets,
    })
}



export default connect(mapStateToProps, { filterQuestionForExamSet, fetchQuestionCategoryList, fetchQuestionComplexityList, fetchSetQuestionsByExamSet, saveExamSetQuestions })(ExamQuestions);