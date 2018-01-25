import React from 'react';
import { Panel } from 'react-bootstrap';
import classnames from 'classnames';
import { Redirect, match, matchPath, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import theme from 'react-quill/dist/quill.snow.css';

import { fetchIntervieweesBySessionId, updateInterviewee, saveInterviewee, deleteInterviewee } from '../../actions/interviewee.action';
import { fetchJobTypes } from '../../actions/jobTypes.action';
import { fetchExamSetsByJobId } from '../../actions/examset.action';

import IntervieweeList from './intervieweeList.component';

class AddInterviewees extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            InterviewSessionId: this.props.match.params.id,
            IntervieweeId: '',
            FirstName: '',
            MiddleName: '',
            LastName: '',
            FullName: '',
            EmailAddress: '',
            ContactNumber: '',
            Address: '',
            JobTitleId: '',
            ExamSetId: '',
            JobTitle: '',
            CreatedBy: this.props.user.UserId,
            errors: {},
            loading: false,
            done: false
        }
    }

    componentDidMount = (props) => {
        this.props.fetchJobTypes();

        if (this.props.match.params.id) {
            this.props.fetchIntervieweesBySessionId(this.props.match.params.id);
        }
    }

    editInterviewee = (intervieweeObject) => {
       
        this.setState({
            InterviewSessionId: intervieweeObject.InterviewSessionId,
            IntervieweeId: intervieweeObject.IntervieweeId,
            FirstName: intervieweeObject.FirstName,
            MiddleName: intervieweeObject.MiddleName,
            LastName: intervieweeObject.LastName,
            FullName: intervieweeObject.FullName,
            EmailAddress: intervieweeObject.EmailAddress,
            ContactNumber: intervieweeObject.ContactNumber,
            Address: intervieweeObject.Address,
            JobTitleId: intervieweeObject.JobTitleId,
            ExamSetId: intervieweeObject.ExamSetId,
            ExamSetTitle:intervieweeObject.ExamSetTitle,
            JobTitle: intervieweeObject.JobTitle,
            CreatedBy: intervieweeObject.CreatedBy,
        });
         this.props.fetchExamSetsByJobId(intervieweeObject.JobTitleId);
    }
    resetForm = () => {
        this.setState({
            InterviewSessionId: this.props.match.params.id,
            SessionwiseJobId: 0,
            JobTitleId: "0",
            ExamSetId: "0",
            IntervieweeId: '',
            FirstName: '',
            MiddleName: '',
            LastName: '',
            FullName: '',
            EmailAddress: '',
            ContactNumber: '',
            Address: '',
            JobTitle: ''
        });
    }

    deleteInterviewee = (id) => {
        this.props.deleteInterviewee(id)
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
                errors
            });
        } else {
            this.setState({
                [e.target.name]: e.target.value
            }, () => {
                this.setState({
                    FullName: this.state.FirstName + ' ' + this.state.MiddleName + ' ' + this.state.LastName
                });
            });
        }
    }

    handleSelectChange = (e) => {
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


            this.props.fetchExamSetsByJobId(e.target.value);

            console.log('select change event called', this.state)
            this.setState({

                [e.target.name]: e.target.value,
                [e.target.title]: e.target[index].text,
            });
        }
    }

    handleExamSetSelectChange = (e) => {
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
                [e.target.title]: e.target[index].text,
            });
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();

        // validate the form here

        let errors = {};
        if (this.state.FirstName == '') {
            errors.FirstName = 'First Name is required';
        }
        if (this.state.LastName == '') {
            errors.LastName = 'Last Name is required';
        }
        if (this.state.EmailAddress == '') {
            errors.EmailAddress = 'Email Address is required';
        }
        if (this.state.ContactNumber == '') {
            errors.ContactNumber = 'Contact Number is required';
        }

        if (this.state.JobTitleId === '0') {
            errors.JobTitleId = 'Please select Job';
        }
        if (this.state.ExamSetId === '0') {
            errors.ExamSetId = 'Please select Exam Set';
        }

        this.setState({
            errors
        });


        const isValid = Object.keys(errors).length === 0;

        if (isValid) {
            console.log('what is in state',this.state)
            const { IntervieweeId, InterviewSessionId, FirstName, MiddleName, LastName, JobTitleId, EmailAddress, ContactNumber, Address, CreatedBy, JobTitle, FullName, ExamSetId,ExamSetTitle } = this.state;

            this.setState({ loading: true });



            if (IntervieweeId) {
                this.props.updateInterviewee({ IntervieweeId, InterviewSessionId, FirstName, MiddleName, LastName, JobTitleId, EmailAddress, ContactNumber, Address, CreatedBy, JobTitle, FullName, ExamSetId,ExamSetTitle })
                    .then((res) => {
                        this.setState({ loading: false });
                        this.setState({ done: true });
                        this.resetForm();
                    },
                    (err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
                    );
            }
            else {
                this.props.saveInterviewee({ InterviewSessionId, FirstName, MiddleName, LastName, JobTitleId, EmailAddress, ContactNumber, Address, CreatedBy, JobTitle, FullName, ExamSetId,ExamSetTitle })
                    .then((res) => {
                        this.setState({ done: true });
                        this.setState({ loading: false });
                        this.resetForm();
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
                            <th>Interviewee Name</th>
                            <th>Email Address</th>
                            <th>Contact Number</th>
                            <th>Job</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr>
                            <td colSpan="6">There are no interviewees added in this session.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }



    renderForm() {
        { console.log('title', this.p) }
        return (
            <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleFormSubmit}>
                <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="form-group col-xs-10 col-sm-4 col-md-4 col-lg-4">
                        <div className={classnames('field', { errors: !!this.state.errors.FirstName })}>
                            <label>First Name </label>
                            <input
                                type="text"
                                name="FirstName"
                                value={this.state.FirstName}
                                onChange={this.handleChange}
                                className="form-control" />
                            <span className="form-error">{this.state.errors.FirstName}</span>
                        </div>
                    </div>

                    <div className="form-group col-xs-10 col-sm-4 col-md-4 col-lg-4">
                        <div className={classnames('field')}>
                            <label>Middle Name </label>
                            <input
                                type="text"
                                name="MiddleName"
                                value={this.state.MiddleName}
                                onChange={this.handleChange}
                                className="form-control" />

                        </div>
                    </div>

                    <div className="form-group col-xs-10 col-sm-4 col-md-4 col-lg-4">
                        <div className={classnames('field', { errors: !!this.state.errors.LastName })}>
                            <label>Last Name </label>
                            <input
                                type="text"
                                name="LastName"
                                value={this.state.LastName}
                                onChange={this.handleChange}
                                className="form-control" />
                            <span className="form-error">{this.state.errors.LastName}</span>
                        </div>
                    </div>
                </div>

                <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="form-group col-xs-10 col-sm-4 col-md-4 col-lg-4">
                        <div className={classnames('field', { errors: !!this.state.errors.EmailAddress })}>
                            <label>Email Address </label>
                            <input
                                type="email"
                                name="EmailAddress"
                                value={this.state.EmailAddress}
                                onChange={this.handleChange}
                                className="form-control" />
                            <span className="form-error">{this.state.errors.EmailAddress}</span>
                        </div>
                    </div>

                    <div className="form-group col-xs-10 col-sm-4 col-md-4 col-lg-4">
                        <div className={classnames('field', { errors: !!this.state.errors.ContactNumber })}>
                            <label>Contact Number</label>
                            <input
                                type="number"
                                name="ContactNumber"
                                value={this.state.ContactNumber}
                                onChange={this.handleChange}
                                className="form-control" />
                            <span className="form-error">{this.state.errors.ContactNumber}</span>
                        </div>
                    </div>

                    <div className="form-group col-xs-10 col-sm-4 col-md-4 col-lg-4">
                        <div className={classnames('field', { errors: !!this.state.errors.JobTitleId })}>
                            <label>Job Title</label>
                            <select name="JobTitleId" title="JobTitle" className="form-control" onChange={this.handleSelectChange.bind(this)}>
                                <option value="0">--Select Job Title--</option>
                                {this.props.jobs.map((job, idx) => (
                                    <option selected={job.JobTitleId === this.state.JobTitleId ? true : false} value={job.JobTitleId}>{job.JobTitle}</option>
                                ))}
                            </select>
                            <span className="form-error">{this.state.errors.JobTitleId}</span>
                        </div>
                    </div>
                </div>

                <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="form-group col-xs-10 col-sm-8 col-md-8 col-lg-8">
                        <div className={classnames('field', { errors: !!this.state.errors.Address })}>
                            <label> Address </label>
                            <input
                                type="text"
                                name="Address"
                                value={this.state.Address}
                                onChange={this.handleChange}
                                className="form-control" />
                            <span className="form-error">{this.state.errors.Address}</span>
                        </div>
                    </div>
                    <div className="form-group col-xs-10 col-sm-4 col-md-4 col-lg-4">
                        <div className={classnames('field', { errors: !!this.state.errors.JobTitleId })}>
                            <label>Exam Set Title</label>
                            <select name="ExamSetId" title="ExamSetTitle" className="form-control" onChange={this.handleExamSetSelectChange.bind(this)}>
                                <option value="0">--Select ExamSet--</option>
                                {this.props.examsetList.map((examSet, idx) => (
                                    <option selected={examSet.ExamSetId === this.state.ExamSetId ? true : false} value={examSet.ExamSetId}>{examSet.Title}</option>
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
        let intervieweeListComponent;
        if (this.props.intervieweeList) {
            intervieweeListComponent = <IntervieweeList interviewees={this.props.intervieweeList} editInterviewee={this.editInterviewee} deleteInterviewee={this.deleteInterviewee} />
        } else {
            intervieweeListComponent = this.EmptyMessage()
        }
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <NavLink to={`/admin/interviewsessions`} ><span>&larr; Back &nbsp;</span></NavLink>
                        <span> {this.props.heading}</span>
                    </div>
                    <div className="panel-body">
                        {this.renderForm()}
                    </div>

                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4><u>List of Interviewees for this session</u></h4>
                    </div>
                    <div className="panel-body">
                        {intervieweeListComponent}
                    </div>

                </div>

            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    console.log('sdfsdfsdfsdfsd sdf sdf', state.intervieweeReducer.intervieweeList);
    if (props.match.params.id) {
        return {
            intervieweeList: state.intervieweeReducer.intervieweeList,
            jobs: state.jobTypes,
            user: state.authReducer.user,
            examsetList: state.examsets.examsetList

        }
    }
    return {
        intervieweeList: null,
        jobs: state.jobTypes,
        user: state.authReducer.user,
        examsetList: state.examsets.examsetList

    }
}


export default connect(mapStateToProps, { fetchJobTypes, fetchExamSetsByJobId, fetchIntervieweesBySessionId, updateInterviewee, saveInterviewee, deleteInterviewee })(AddInterviewees);