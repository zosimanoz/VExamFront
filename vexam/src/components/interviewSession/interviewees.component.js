import React from 'react';
import { Panel } from 'react-bootstrap';
import classnames from 'classnames';
import { Redirect, match, matchPath, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import theme from 'react-quill/dist/quill.snow.css';

import { fetchIntervieweesBySessionId, updateInterviewee, saveInterviewee, deleteInterviewee } from '../../actions/interviewee.action';
import { fetchJobTypes } from '../../actions/jobTypes.action';

import IntervieweeList from './intervieweeList.component';

class AddInterviewees extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = (props) => {
        this.props.fetchJobTypes();
        if (this.props.match.params.id) {
            this.props.fetchIntervieweesBySessionId(this.props.match.params.id);
        }
    }


    state = {
        InterviewSessionId: this.props.match.params.id,
        IntervieweeId: this.props.interviewees ? this.props.interviewees.IntervieweeId : '',
        FirstName: this.props.interviewees ? this.props.interviewees.FirstName : '',
        MiddleName: this.props.interviewees ? this.props.interviewees.MiddleName : '',
        LastName: this.props.interviewees ? this.props.interviewees.LastName : '',
        FullName: this.props.interviewees ? this.props.interviewees.FullName : '',
        EmailAddress: this.props.interviewees ? this.props.interviewees.EmailAddress : '',
        ContactNumber: this.props.interviewees ? this.props.interviewees.ContactNumber : '',
        Address: this.props.interviewees ? this.props.interviewees.Address : '',
        JobTitleId: this.props.interviewees ? this.props.interviewees.JobTitleId : '',
        JobTitle: this.props.interviewees ? this.props.interviewees.JobTitle : '',
        CreatedBy: this.props.interviewees ? this.props.interviewees.CreatedBy : '2',
        errors: {},
        loading: false,
        done: false
    }


    componentWillReceiveProps = (new_props) => {
        this.setState({
            InterviewSessionId: this.props.match.params.id,
            IntervieweeId: new_props.interviewees ? new_props.interviewees.IntervieweeId : '',
            FirstName: new_props.interviewees ? new_props.interviewees.FirstName : '',
            MiddleName: new_props.interviewees ? new_props.interviewees.MiddleName : '',
            LastName: new_props.interviewees ? new_props.interviewees.LastName : '',
            FullName: new_props.interviewees ? new_props.interviewees.FullName : '',
            EmailAddress: new_props.interviewees ? new_props.interviewees.EmailAddress : '',
            ContactNumber: new_props.interviewees ? new_props.interviewees.ContactNumber : '',
            Address: new_props.interviewees ? new_props.interviewees.Address : '',
            JobTitleId: new_props.interviewees ? new_props.interviewees.JobTitleId : '',
            JobTitle: new_props.interviewees ? new_props.interviewees.JobTitle : '',
            CreatedBy: new_props.interviewees ? new_props.interviewees.CreatedBy : '2',
            errors: {},
            loading: false,
            done: false
        });
    }
    editInterviewee = (intervieweeObject) => {
        console.log(intervieweeObject);
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
            JobTitle: intervieweeObject.JobTitle,
            CreatedBy: intervieweeObject.CreatedBy,
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
            },()=>{
                this.setState({ 
                    FullName: this.state.FirstName +' '+ this.state.MiddleName +' '+this.state.LastName 
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
            errors.ExamSetId = 'First Name is required';
        }
        if (this.state.LastName == '') {
            errors.ExamSetId = 'Last Name is required';
        }
        if (this.state.EmailAddress == '') {
            errors.ExamSetId = 'Email Address is required';
        }
        if (this.state.ContactNumber == '') {
            errors.ExamSetId = 'Contact Number is required';
        }

        if (this.state.JobTitleId === '0') {
            errors.JobTitleId = 'Please select Job';
        }

        this.setState({
            errors
        });


        const isValid = Object.keys(errors).length === 0;
       
        if (isValid) {

            const { IntervieweeId, InterviewSessionId,FirstName ,MiddleName,LastName,JobTitleId, EmailAddress,ContactNumber,Address, CreatedBy ,JobTitle,FullName } = this.state;
         
            this.setState({ loading: true });
           
           

            if (IntervieweeId) {
                this.props.updateInterviewee({ IntervieweeId, InterviewSessionId,FirstName ,MiddleName,LastName,JobTitleId, EmailAddress,ContactNumber,Address, CreatedBy,JobTitle,FullName })
                    .then((res) => {
                        this.setState({ loading: false });
                        this.setState({ done: true });
                    },
                    (err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
                    );
            }
            else {
                this.props.saveInterviewee({ InterviewSessionId,FirstName ,MiddleName,LastName,JobTitleId, EmailAddress,ContactNumber,Address, CreatedBy ,JobTitle,FullName})
                    .then((res) => {
                        this.setState({ done: true });
                        this.setState({ loading: false })
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
        { console.log('title', this.state) }
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
                                type="text"
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
                                type="text"
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
            intervieweeListComponent = <IntervieweeList interviewees={this.props.intervieweeList} editInterviewee={this.editInterviewee} deleteInterviewee= {this.deleteInterviewee}  />
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
            jobs: state.jobTypes
            
        }
    }
    return {
        intervieweeList: null,
        jobs: state.jobTypes
    }
}


export default connect(mapStateToProps, { fetchJobTypes, fetchIntervieweesBySessionId, updateInterviewee, saveInterviewee, deleteInterviewee })(AddInterviewees);