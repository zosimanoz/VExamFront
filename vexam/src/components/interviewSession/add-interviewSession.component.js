import React from 'react';
import { Panel } from 'react-bootstrap';
import classnames from 'classnames';
import { Redirect, match, matchPath,NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import theme from 'react-quill/dist/quill.snow.css';

import { fetchInterviewSessionById, updateInterviewSession, saveInterviewSession} from '../../actions/interviewSession.action';


class AddInterviewSession extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = (props) => {
        console.log('props',this.props);
        if (this.props.match.params.id) {
            this.props.fetchInterviewSessionById(this.props.match.params.id);
        }
    }


    state = {
        InterviewSessionId: this.props.interviewSession ?this.props.interviewSession.InterviewSessionId : null,
        Title: this.props.interviewSession ? this.props.interviewSession.Title : '',
        SessionStartDate: this.props.interviewSession ? this.props.interviewSession.SessionStartDate : '',
        SessionEndDate: this.props.interviewSession ? this.props.interviewSession.SessionEndDate: '',
        CreatedBy: this.props.interviewSession ? this.props.interviewSession.CreatedBy: 2,
        errors: {},
        loading: false,
        done: false
    }

    componentWillReceiveProps = (new_props) => {
        this.setState({
        InterviewSessionId: new_props.interviewSession ? new_props.interviewSession.InterviewSessionId : null,
        Title: new_props.interviewSession ? new_props.interviewSession.Title : '',
        SessionStartDate: new_props.interviewSession ? new_props.interviewSession.SessionStartDate : '',
        SessionEndDate: new_props.interviewSession ? new_props.interviewSession.SessionEndDate: '',
        CreatedBy: this.props.interviewSession ? this.props.interviewSession.CreatedBy: 2,
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




    handleFormSubmit = (e) => {
        e.preventDefault();

        // validate the form here

        let errors = {};
        if (this.state.Title === '') {
            errors.Title = 'Title cannot be empty';
        }
     
        if (this.state.SessionStartDate === '') {
            errors.SessionStartDate = 'Session Start Date is required';
        }
        if (this.state.SessionEndDate == '') {
            errors.SessionEndDate = 'Session Expiration Date is required';
        }


        this.setState({
            errors
        });


        const isValid = Object.keys(errors).length === 0;

        if (isValid) {
            debugger;

            const {InterviewSessionId, Title, SessionStartDate, SessionEndDate ,CreatedBy} = this.state;

            this.setState({ loading: true });

            if(InterviewSessionId) {
                this.props.updateInterviewSession({InterviewSessionId, Title, SessionStartDate, SessionEndDate ,CreatedBy})
                .then((res)=>{ 
                    this.setState({ loading: false });
                    this.setState({ done: true });
                 },
                    (err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
                 );
            }
            else {
            this.props.saveInterviewSession({ Title, SessionStartDate, SessionEndDate,CreatedBy })
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
        {console.log('title',this.state.interviewSession)}
        return (
            <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleFormSubmit}>

                <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                    <div className={classnames('field', { errors: !!this.state.errors.Title })}>
                        <label>Interview Session title</label>
                        <input
                            type="text"
                            name="Title"
                            value={this.state.Title}
                            onChange={this.handleChange}
                            className="form-control" />
                        <span className="form-error">{this.state.errors.Title}</span>
                    </div>
                </div>

                 <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                    <div className={classnames('field', { errors: !!this.state.errors.SessionStartDate })}>
                        <label>Start Date</label>
                        <input
                            type="text"
                            name="SessionStartDate"
                            value={this.state.SessionStartDate}
                            onChange={this.handleChange}
                            className="form-control" />
                        <span className="form-error">{this.state.errors.SessionStartDate}</span>
                    </div>
                </div>

                <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                    <div className={classnames('field', { errors: !!this.state.errors.SessionEndDate })}>
                        <label>End Date</label>
                        <input
                            type="text"
                            name="SessionEndDate"
                            value={this.state.SessionEndDate}
                            onChange={this.handleChange}
                            className="form-control" />
                        <span className="form-error">{this.state.errors.SessionEndDate}</span>
                    </div>
                </div>
                <div className="clearfix"></div>

                <div className="btn-form-margin-top div-add-question">
                    <button className="btn btn-success btn-sm">Save</button>
                     <NavLink to={`/admin/interviewsessions`} className="btn btn-danger btn-sm btn-right-margin"><span>Cancel</span></NavLink>
                </div>
            </form>
        )
    }

    render() {
        return (
            <Panel header={this.props.heading}>
              {this.state.done ? <Redirect to="/admin/interviewsessions" /> : this.renderForm()}
            </Panel>
        )
    }
}

const mapStateToProps = (state,props) => {
    console.log('sdfsdfsdfsdfsd sdf sdf',state.interviewSessions);
    if (props.match.params.id) {
        return {
            interviewSession: state.interviewSessions.interviewSession        }
    }
    return {
       interviewSession:null
    }
}


export default connect(mapStateToProps,{fetchInterviewSessionById, updateInterviewSession, saveInterviewSession})(AddInterviewSession);