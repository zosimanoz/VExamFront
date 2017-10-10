import React from 'react';
import { Panel } from 'react-bootstrap';
import classnames from 'classnames';
import { Redirect, match, matchPath,NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import ReactQuill from 'react-quill';
import theme from 'react-quill/dist/quill.snow.css';

import { fetchExamSets, saveExamSet, fetchExamSetById, deleteExamSetById,updateExamSet} from '../../actions/examset.action';
import { fetchJobTypes } from '../../actions/jobTypes.action';


class AddExamSet extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = (props) => {
         this.props.fetchJobTypes();
        if (this.props.match.params.id) {
            this.props.fetchExamSetById(this.props.match.params.id);
        }
      
    }


    state = {
        ExamSetId: this.props.examset ? this.props.examset.ExamSetId : null,
        Title: this.props.examset ? this.props.examset.Title : '',
        Description: this.props.examset ? this.props.examset.Description : '',
        TotalMark: this.props.examset ? this.props.examset.TotalMark: '',
        JobTitleId : this.props.examset ? this.props.examset.JobTitleId: '',
        CreatedBy: this.props.examset ? this.props.examset.CreatedBy: 2,
        ExamDuration:this.props.examset ? this.props.examset.ExamDuration: 90,
        errors: {},
        loading: false,
        done: false
    }

    componentWillReceiveProps = (new_props) => {
        this.setState({
        ExamSetId: new_props.examset ? new_props.examset.ExamSetId : null,
        Title: new_props.examset ? new_props.examset.Title : '',
        Description: new_props.examset ? new_props.examset.Description : '',
        TotalMark: new_props.examset ? new_props.examset.TotalMark: '',
        JobTitleId : new_props.examset ? new_props.examset.JobTitleId: '',
        CreatedBy: new_props.examset ? new_props.examset.CreatedBy: 2,
        ExamDuration:new_props.examset ? new_props.examset.ExamDuration: 90,
        errors: {},
        loading: false,
        done: false
        });
    }
    handleChange = (e) => {

        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];

            this.setState({
                [e.target.name]: e.target.value,
                errors
            });
        } else {
            this.setState({
                [e.target.name]: e.target.value
            });
        }

    }

        // handleDurationChange(e){
        //     this.setState({  
        //            ExamDuration: e.target.value
        //         });
        //     // const re = /^[0-9\b]+$/;
        //     // if (e.target.value == '' || re.test(e.target.value)) {
        //     //     this.setState({  
        //     //        ExamDuration: e.target.value
        //     //     });
        //     // }
        // }

    
    handleChangeForEditor = (value) => {
        this.setState({
            Description: value
        })
    }


    handleFormSubmit = (e) => {
        e.preventDefault();




        // validate the form here

        let errors = {};
        if (this.state.Title === '') {
            errors.Title = 'Title cannot be empty';
        }
        if (this.state.Description === '') {
            errors.Description = 'Description cannot be left empty.';
        }
        if (this.state.TotalMark === '') {
            errors.TotalMark = 'Total marks cannot be left empty.';
        }
        if (this.state.JobTitleId == '') {
            errors.JobTitleId = 'Select job title.';
        }
        if (this.state.ExamDuration == '') {
            errors.ExamDuration = 'Please Specify Exam Duration.';
        }

        this.setState({
            errors
        });


        const isValid = Object.keys(errors).length === 0;

        if (isValid) {

            const {ExamSetId, Title, Description, TotalMark, CreatedBy,JobTitleId,ExamDuration} = this.state;

            this.setState({ loading: true });

            if(ExamSetId) {
                this.props.updateExamSet({ExamSetId, Title, Description, TotalMark, CreatedBy, JobTitleId,ExamDuration })
                .then((res)=>{ 
                    this.setState({ loading: false });
                    this.setState({ done: true });
                 },
                    (err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
                 );
            }
            else {
            this.props.saveExamSet({ Title, Description, TotalMark, CreatedBy, JobTitleId,ExamDuration })
                .then(() => {
                    this.setState({ done: true });
                    this.setState({ loading: false })
                },
                (err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
                );
            }
        }

    }




    renderForm() {
        {console.log('title',this.state.Title)}
        return (
            <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleFormSubmit}>

                <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                    <div className={classnames('field', { errors: !!this.state.errors.Title })}>
                        <label>Question set name</label>
                        <input
                            type="text"
                            name="Title"
                            value={this.state.Title}
                            onChange={this.handleChange}
                            placeholder="Enter question set title."
                            className="form-control" />
                        <span className="form-error">{this.state.errors.Title}</span>
                    </div>
                </div>
                <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                    <div className={classnames('field', { errors: !!this.state.errors.ExamDuration })}>
                        <label>Exam Duration (in minutes)</label>
                        <input
                            type="text"
                            name="ExamDuration"
                            value={this.state.ExamDuration}
                            onChange={this.handleChange}
                            placeholder="Enter Exam Duration."
                            className="form-control" />
                        <span className="form-error">{this.state.errors.ExamDuration}</span>
                    </div>
                </div>

                <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className={classnames('field', { errors: !!this.state.errors.Description })}>
                        <label>Description</label>

                        <ReactQuill name="Description" value={this.state.Description}
                            onChange={this.handleChangeForEditor} />

                        <span className="form-error">{this.state.errors.Description}</span>
                    </div>
                </div>

                 <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                    <div className={classnames('field', { errors: !!this.state.errors.TotalMark })}>
                        <label>Total Marks</label>
                        <input
                            type="text"
                            name="TotalMark"
                            value={this.state.TotalMark}
                            placeholder="Enter total marks."
                            onChange={this.handleChange}
                            className="form-control" />
                        <span className="form-error">{this.state.errors.TotalMark}</span>
                    </div>
                </div>

                <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                    <div className={classnames('field', { errors: !!this.state.errors.JobTitleId })}>
                        <label>Job Title </label>
                           <select name="JobTitleId" className="form-control" onChange={this.handleChange.bind(this)}>
                            <option value="0">--Select Job Title--</option>
                            {this.props.jobs.map((job, idx) => (
                                <option selected={job.JobTitleId === this.state.JobTitleId ? true : false} value={job.JobTitleId}>{job.JobTitle}</option>
                            ))}
                        </select>
                        <span className="form-error">{this.state.errors.JobTitleId}</span>
                    </div>
                </div>
                <div className="clearfix"></div>

                <div className="btn-form-margin-top div-add-question">
                    <button className="btn btn-success btn-sm">Save</button>
                     <NavLink to={`/admin/examsets`} className="btn btn-danger btn-sm btn-right-margin"><span>Cancel</span></NavLink>
                </div>
            </form>
        )
    }

    render() {
        return (
            <Panel header={this.props.heading}>
              {this.state.done ? <Redirect to="/admin/examsets" /> : this.renderForm()}
            </Panel>
        )
    }
}



const mapStateToProps = (state,props) => {
    if (props.match.params.id) {
        return {
            examset: state.examsets.examset,
              jobs:state.jobTypes
        }
    }

    return {
       // examset: null,
          jobs:state.jobTypes
    }
}


export default connect(mapStateToProps,{fetchJobTypes,fetchExamSets, saveExamSet, fetchExamSetById, deleteExamSetById,updateExamSet})(AddExamSet);