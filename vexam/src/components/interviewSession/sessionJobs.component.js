import React from 'react';
import { Panel } from 'react-bootstrap';
import classnames from 'classnames';
import { Redirect, match, matchPath, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import theme from 'react-quill/dist/quill.snow.css';

import { fetchSessionJobBySessionId, updateSessionJob, saveSessionJob, deleteSessionJob, checkJobExists } from '../../actions/sessionJobs.action';
import { fetchJobTypes } from '../../actions/jobTypes.action';
import { fetchExamSets } from '../../actions/examset.action';

import SessionJobList from './sessionJobList.component';

class AddSessionJobs extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = (props) => {
        this.props.fetchJobTypes();
        this.props.fetchExamSets();
        if (this.props.match.params.id) {
            this.props.fetchSessionJobBySessionId(this.props.match.params.id);
        }
    }


    state = {
        InterviewSessionId: this.props.match.params.id,
        ExamSetTitle: this.props.sessionJobs ? this.props.sessionJobs.ExamSetTitle : '',
        SessionwiseJobId: this.props.sessionJobs ? this.props.sessionJobs.SessionwiseJobId : '',
        JobTitleId: this.props.sessionJobs ? this.props.sessionJobs.JobTitleId : '',
        JobTitle: this.props.sessionJobs ? this.props.sessionJobs.JobTitle : '',
        ExamSetId: this.props.sessionJobs ? this.props.sessionJobs.ExamSetId : '',
        CreatedBy: this.props.sessionJobs ? this.props.sessionJobs.CreatedBy : this.props.user.UserId,
        errors: {},
        loading: false,
        done: false
    }

    componentWillReceiveProps = (new_props) => {
        this.setState({
            InterviewSessionId: this.props.match.params.id,
            ExamSetTitle: new_props.sessionJobs ? new_props.sessionJobs.ExamSetTitle : '',
            SessionwiseJobId: new_props.sessionJobs ? new_props.sessionJobs.SessionwiseJobId : '',
            JobTitleId: new_props.sessionJobs ? new_props.sessionJobs.JobTitleId : '',
            JobTitle: new_props.sessionJobs ? new_props.sessionJobs.JobTitle : '',
            ExamSetId: new_props.sessionJobs ? new_props.sessionJobs.ExamSetId : '',
            CreatedBy: new_props.sessionJobs ? this.props.sessionJobs.CreatedBy : this.props.user.UserId,
            errors: {},
            loading: false,
            done: false
        });
    }
    editJob = (sessionObject) => {
        console.log(sessionObject);
        this.setState({
            InterviewSessionId: sessionObject.InterviewSessionId,
            SessionwiseJobId: sessionObject.SessionwiseJobId,
            JobTitleId: sessionObject.JobTitleId,
            ExamSetId: sessionObject.ExamSetId,
            ExamSetTitle: sessionObject.ExamSetTitle,
            JobTitle: sessionObject.JobTitle,
        });

    }
    resetForm = () => {
        this.setState({
            InterviewSessionId: this.props.match.params.id,
            SessionwiseJobId: 0,
            JobTitleId: "0",
            ExamSetId: "0",
        });
    }

    deleteJob = (id) => {
        this.props.deleteSessionJob(id)
            .then((res) => {
                this.setState({ loading: false });
                this.setState({ done: true });
            },
            (err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
            );
    }

    handleChange = (e) => {
        var index = e.nativeEvent.target.selectedIndex;
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];

            this.setState({
                [e.target.name]: e.target.value,
                [e.target.title]: e.target[index].text,
                errors
            });
        } else {
            this.setState({
                [e.target.name]: e.target.value,
                [e.target.title]: e.target[index].text
            });
        }

    }




    handleFormSubmit = (e) => {
        e.preventDefault();

        // validate the form here

        let errors = {};
        if (this.state.ExamSetId == '0') {
            errors.ExamSetId = 'Please select Exam set';
        }

        if (this.state.JobTitleId === '') {
            errors.JobTitleId = 'Please select Job';
        }

        this.setState({
            errors
        });


        const isValid = Object.keys(errors).length === 0;

        if (isValid) {
            const { SessionwiseJobId, InterviewSessionId, JobTitleId, ExamSetId, CreatedBy, ExamSetTitle, JobTitle } = this.state;

            this.setState({ loading: true });



            if (SessionwiseJobId) {
                this.props.updateSessionJob({ SessionwiseJobId, InterviewSessionId, JobTitleId, ExamSetId, CreatedBy, ExamSetTitle, JobTitle })
                    .then((res) => {
                        this.setState({ loading: false });
                        this.setState({ done: true });
                    },
                    (err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
                    );
            }
            else {
                this.props.checkJobExists({ InterviewSessionId, JobTitleId, ExamSetId })
                    .then((res) => {
                        console.log("result-exists--->", this.props);
                        if (this.props.jobExists) {

                            let errors = {};
                         
                                errors.ExamSetId = 'Already exists';

                                errors.JobTitleId = 'Already exists';

                            this.setState({
                                errors
                            });
                            return;
                        } else {
                            this.props.saveSessionJob({ InterviewSessionId, JobTitleId, ExamSetId, CreatedBy, ExamSetTitle, JobTitle })
                                .then(() => {
                                    this.setState({ done: true });
                                    this.setState({ loading: false })
                                },
                                (err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
                                );
                        }
                    },
                    (err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
                    );

            }
        }

    }
    EmptyMessage() {
        return (
            <div className="clearfix">
                <table className="table table-bordered table-condensed table-hover">
                    <thead>
                        <tr>
                            <th>S.N</th>
                            <th>JobTitle</th>
                            <th>Exam Set Title</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr>
                            <td colSpan="4">There are no job vacancies added in this session.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }



    renderForm() {
        { console.log('title', this.state) }
        return (
            <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleFormSubmit}>


                <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                        <div className={classnames('field', { errors: !!this.state.errors.Title })}>
                            <label>Job Title </label>
                            <select name="JobTitleId" title="JobTitle" className="form-control" onChange={this.handleChange.bind(this)}>
                                <option value="0">--Select Job Title--</option>
                                {this.props.jobs.map((job, idx) => (
                                    <option selected={job.JobTitleId === this.state.JobTitleId ? true : false} value={job.JobTitleId}>{job.JobTitle}</option>
                                ))}
                            </select>
                            <span className="form-error">{this.state.errors.JobTitleId}</span>
                        </div>
                    </div>

                    <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                        <div className={classnames('field', { errors: !!this.state.errors.SessionStartDate })}>
                            <label>Exam Set </label>
                            <select name="ExamSetId" title="ExamSetTitle" className="form-control" onChange={this.handleChange.bind(this)}>
                                <option value="0">--Select Exam Set--</option>
                                {this.props.examsets.map((examset, idx) => (
                                    <option selected={examset.ExamSetId === this.state.ExamSetId ? true : false} value={examset.ExamSetId}>{examset.Title}</option>
                                ))}
                            </select>
                            <span className="form-error">{this.state.errors.ExamSetId}</span>
                        </div>
                    </div>
                </div>
                <div className="clearfix"></div>

                <div className="btn-form-margin-top div-add-question pull-right">
                    <button className="btn btn-success btn-sm ">Add</button>
                    <button className="btn btn-danger btn-sm btn-right-margin" type="button" onClick={() => this.resetForm()} >Reset</button>
                </div>
            </form>
        )
    }

    render() {
        let sessionjobListComponent;
        if (this.props.sessionJobList) {
            sessionjobListComponent = <SessionJobList sessionJobs={this.props.sessionJobList} editJob={this.editJob} deleteJob={this.deleteJob} />
        } else {
            sessionjobListComponent = this.EmptyMessage()
        }
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <NavLink to={`/admin/interviewsessions`} ><span>&larr; Back &nbsp;</span></NavLink>
                    <span> {this.props.heading}</span>
                </div>
                <div className="panel-body">
                    {this.renderForm()}

                    <div className="clearfix"></div>
                    <hr />
                    <h3><u>Job Vacancies with respective exam sets</u></h3>
                    {sessionjobListComponent}

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {

    if (props.match.params.id) {
        return {
            sessionJobList: state.sessionJobReducer.sessionJobList,
            jobs: state.jobTypes,
            examsets: state.examsets.examsetList,
            user: state.authReducer.user,
            jobExists: state.sessionJobReducer.jobExists
        }
    }
    return {
        sessionJobList: null,
        jobs: state.jobTypes,
        examsets: state.examsets.examsetList,
        user: state.authReducer.user,
        jobExists: state.sessionJobReducer.jobExists
    }
}


export default connect(mapStateToProps, { fetchSessionJobBySessionId, fetchJobTypes, fetchExamSets, updateSessionJob, saveSessionJob, deleteSessionJob, checkJobExists })(AddSessionJobs);