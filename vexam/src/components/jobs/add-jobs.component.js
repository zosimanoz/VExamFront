import React from 'react';
import classnames from 'classnames';

import { connect } from 'react-redux';

import { Redirect, match, matchPath } from 'react-router-dom';

import { Bootstrap, Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem, Panel } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { saveJobType,fetchJobTypeById,updateJobType } from '../../actions/jobTypes.action';

class AddJob extends React.Component {


    state = {
        JobTitleId: this.props.jobTypes ? this.props.jobTypes.JobTitleId : null,
        JobTitle: this.props.jobTypes ? this.props.jobTypes.JobTitle : '',
        Description: this.props.jobTypes ? this.props.jobTypes.Description : '',
        errors: {},
        loading: false,
        done: false
    }


    // after new props are received from store, the ui must be aware of the new props 
    // and show the data into the form using this lifecycle event

    componentWillReceiveProps = (new_props) => {
        this.setState({
            JobTitleId: new_props.jobTypes.JobTitleId,
            JobTitle: new_props.jobTypes.JobTitle,
            Description: new_props.jobTypes.Description
        });
    }

    // this lifecycle event works when we first load component
    componentDidMount = (props) => {
        console.log(this.props)
        if (this.props.match.params.id) {
            this.props.fetchJobTypeById(this.props.match.params.id);
        }
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
        if (this.state.JobTitle === '') {
            errors.JobTitle = 'Job title is a required field';
        }

        this.setState({
            errors
        });


        const isValid = Object.keys(errors).length === 0;

        if (isValid) {
            const { JobTitleId, JobTitle, Description } = this.state;


            this.setState({ loading: true });

            if (JobTitleId > 0) {
                this.props.updateJobType({ JobTitleId, JobTitle, Description  })
                    .then(() => {
                        this.setState({ done: true });
                        this.setState({ loading: false });
                    },
                    (err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
                    );
            }else{
            this.props.saveJobType({ JobTitle, Description })
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
        return (
            <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleFormSubmit}>
                <div className="form-group col-xs-10 col-sm-6 col-md-6 col-lg-6">
                    <div className={classnames('field', { errors: !!this.state.errors.Message })}>
                        <label>Job Title </label>
                        <input type="text"
                            name="JobTitle"
                            className="form-control"
                            value={this.state.JobTitle}
                            onChange={this.handleChange}

                        />

                        <span className="form-error">{this.state.errors.Message}</span>
                    </div>
                </div>
                <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className={classnames('field', { errors: !!this.state.errors.Message })}>
                        <label>Description</label>
                        <textarea
                            name="Description"
                            className="form-control"
                            value={this.state.Description}
                            onChange={this.handleChange}

                        />
                        <span className="form-error">{this.state.errors.Message}</span>
                    </div>
                </div>
                <div className="btn-form-margin-top pull-right">
                    <button className="btn btn-success btn-sm">Save</button>
                    <NavLink to={`/admin/jobs`} className="btn btn-danger btn-sm btn-right-margin"><span>Cancel</span></NavLink>
                </div>
            </form>

        )
    }

    render() {

        return (
            <Panel header={this.props.heading}>

                {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}

                {this.state.done ? <Redirect to="/admin/jobs" /> : this.renderForm()}

            </Panel>
        )

    }

}


function mapStateToProps(state, props) {
    if (props.match.params.id) {
        return {
            jobTypes: state.jobTypes.find(item => item.JobTitleId == props.match.params.id)
        }
    }

    return {
        jobTypes: null
    }
}


export default connect(mapStateToProps, { saveJobType,fetchJobTypeById,updateJobType  })(AddJob);